<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categories; // Asegúrate de importar el modelo Category
use App\Models\Subcategory; // Si usas Subcategory, asegúrate de importarlo
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Obtener todos los productos
    public function index()
    {
        return response()->json(Product::with('category')->get(), 200); // Traer productos con categoría
    }

    // Crear un producto
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath,
            'category_id' => $request->category_id,
            'subcategory_id' => $request->subcategory_id,
        ]);

        return response()->json($product, 201);
    }

    // Obtener un producto por ID
    public function show($id)
    {
        $product = Product::with('category')->find($id); // Traer el producto con la categoría asociada

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($product, 200);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'nullable|exists:categories,id', // Validación de categoría (opcional para update)
            'subcategory_id' => 'nullable|exists:subcategories,id',
        ]);

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Actualizar el producto
        $product->update($request->all());

        return response()->json($product, 200);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Producto eliminado'], 200);
    }
}
