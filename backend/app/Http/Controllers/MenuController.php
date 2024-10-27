<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    // Get all menus
    public function index(): JsonResponse
    {
        $menus = Menu::all();
        return response()->json($menus);
    }

    // Get a specific menu with items (hierarchical)
    public function show($id): JsonResponse
    {
        // Load the menu with top-level items and their nested children recursively
        $menu = Menu::with(['items' => function ($query) {
            $query->whereNull('parent_id')->with('children')->orderBy('created_at');
        }])->findOrFail($id);

        // Transform the `items` key to `children` and recursively add `parentName`
        $menuArray = $menu->toArray();
        $menuArray['children'] = array_map(function ($item) {
            return $this->addParentNameRecursively($item);
        }, $menuArray['items']);
        unset($menuArray['items']); // Remove the `items` key

        return response()->json($menuArray);
    }

    /**
     * Recursively add parentName to each item in the children array.
     */
    protected function addParentNameRecursively(array $item): array
    {
        // Add `parentName` if a parent exists
        if (!empty($item['parent_id'])) {
            // Fetch the parent item only if needed
            $parent = MenuItem::find($item['parent_id']);
            if ($parent) {
                $item['parentName'] = $parent->name;
            }
        }

        // Recursively process children
        if (!empty($item['children'])) {
            $item['children'] = array_map(function ($child) {
                return $this->addParentNameRecursively($child);
            }, $item['children']);
        }

        return $item;
    }

    // Create a new menu
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:menus,name'
        ], [
            'name.unique' => 'A menu with this name already exists.'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $menuId = (string) Str::uuid();
        // Create a new menu
        $menu = Menu::create(['id' => $menuId, 'name' => $request->name]);

        // Add root item for this menu
        $menuItem = new MenuItem([
            'id' => (string) Str::uuid(),
            'menu_id' => $menuId,
            'name' => strtolower($request->name),
            'parent_id' => null,
            'depth' => 0,
        ]);

        $menuItem->save();

        return response()->json([
            'menu' => $menu,
            'root_item' => $menuItem
        ], 201);
    }
}
