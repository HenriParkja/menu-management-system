<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
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
        $request->validate(['name' => 'required|string|unique:menus,name']);

        // Create a new menu
        $menu = Menu::create(['id' => (string) Str::uuid(), 'name' => $request->name]);

        // Add root item for this menu
        $menu->items()->create([
            'id' => (string) Str::uuid(),
            'name' => strtolower($request->name), // Root item with same name as the menu in lowercase
            'depth' => 0,
        ]);

        return response()->json($menu, 201);
    }
}
