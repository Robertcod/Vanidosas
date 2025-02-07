<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Mostrar todas las categorías.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $categories = Categories::all();
        return response()->json($categories);
    }

    /**
     * Crear una nueva categoría.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        $category = Categories::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($category, 201);
    }
    public function getSubcategories($id) {
        $category = Categories::find($id);
        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }
        return response()->json($category->subcategories);
    }
    /**
     * Obtener una categoría específica.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = Categories::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Actualizar una categoría.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        $category = Categories::findOrFail($id);
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($category, 200);
    }

    /**
     * Eliminar una categoría.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category = Categories::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Categoría eliminada correctamente'], 200);
    }
}
