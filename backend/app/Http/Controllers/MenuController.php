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
        $menu = Menu::with('items.children')->findOrFail($id);
        return response()->json($menu);
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
