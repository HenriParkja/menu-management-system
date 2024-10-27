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
        $item = MenuItem::findOrFail($id);
        $item->update($request->only(['name']));

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
