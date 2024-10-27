<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class MenuItemController extends Controller
{
    // Add a new item hierarchically
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',
        ]);

        // Determine the depth based on parent
        $depth = 0;
        if ($request->parent_id) {
            $parent = MenuItem::findOrFail($request->parent_id);
            $depth = $parent->depth + 1;
        }

        // Create the menu item
        $item = MenuItem::create([
            'id' => (string) Str::uuid(),
            'menu_id' => $request->menu_id,
            'name' => $request->name,
            'parent_id' => $request->parent_id,
            'depth' => $depth,
        ]);

        return response()->json($item, 201);
    }

    // Update an existing item
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parentName' => 'sometimes|required|string|max:255',
        ]);

        // Find the item to be updated
        $item = MenuItem::findOrFail($id);

        // Update the item's name if provided
        if ($request->has('name')) {
            $item->name = $request->input('name');
        }

        // Check if 'parentName' is provided and the item has a parent
        if ($request->has('parentName') && $item->parent_id) {
            $parentItem = MenuItem::find($item->parent_id);
            if ($parentItem) {
                $parentItem->name = $request->input('parentName');
                $parentItem->save();
            }
        }

        // Save the updated item
        $item->save();

        return response()->json($item);
    }

    // Delete an item
    public function destroy($id): JsonResponse
    {
        $item = MenuItem::findOrFail($id);
        $item->delete();

        return response()->json(null, 204);
    }
}
