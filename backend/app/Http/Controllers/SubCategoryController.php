<?php


namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    /**
     * Mostrar todas las subcategorías de una categoría específica.
     *
     * @param int $categoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($categoryId)
    {
        $category = Categories::findOrFail($categoryId);
        $subcategories = $category->subcategories;
        return response()->json($subcategories);
    }

    /**
     * Crear una nueva subcategoría.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $categoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeSubcategory(Request $request)
{
    
    // Validar los datos de la subcategoría
    $request->validate([
        'name' => 'required|unique:subcategories,name|max:100',
        'description' => 'nullable|string|max:255',
        'category_id' => 'required|exists:categories,id', // Validación para category_id
    ]);

    try {
        // Crear la subcategoría
        $subcategory = Subcategory::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return response()->json($subcategory, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    /**
     * Obtener una subcategoría específica.
     *
     * @param int $categoryId
     * @param int $subcategoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($categoryId, $subcategoryId)
    {
        $category = Categories::findOrFail($categoryId);
        $subcategory = $category->subcategories()->findOrFail($subcategoryId);
        return response()->json($subcategory);
    }

    /**
     * Actualizar una subcategoría.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $categoryId
     * @param int $subcategoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $categoryId, $subcategoryId)
    {
        $request->validate([
            'name' => 'required|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        $category = Categories::findOrFail($categoryId);
        $subcategory = $category->subcategories()->findOrFail($subcategoryId);

        $subcategory->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($subcategory, 200);
    }

    /**
     * Eliminar una subcategoría.
     *
     * @param int $categoryId
     * @param int $subcategoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($categoryId, $subcategoryId)
    {
        $category = Categories::findOrFail($categoryId);
        $subcategory = $category->subcategories()->findOrFail($subcategoryId);

        $subcategory->delete();

        return response()->json(['message' => 'Subcategoría eliminada correctamente'], 200);
    }
}
