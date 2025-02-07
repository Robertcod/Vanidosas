<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

// Aquí van las rutas de la API
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SubcategoryController;

// Rutas de productos
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Rutas de categorías
Route::get('/categories', [CategoryController::class, 'index']); // Mostrar todas las categorías
Route::post('/categories', [CategoryController::class, 'store']); // Crear una nueva categoría
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Obtener una categoría específica con sus subcategorías
Route::put('/categories/{id}', [CategoryController::class, 'update']); // Actualizar una categoría
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Eliminar una categoría
Route::post('/subcategories/{categoryId}', [SubcategoryController::class, 'storeSubcategory']);

// Rutas de subcategorías
Route::post('/subcategories', [SubcategoryController::class, 'store']); // Crear una nueva subcategoría
Route::get('/subcategories', [SubcategoryController::class, 'index']); // Mostrar todas las subcategorías
Route::get('/subcategories/{id}', [SubcategoryController::class, 'show']); // Obtener una subcategoría específica
Route::put('/subcategories/{id}', [SubcategoryController::class, 'update']); // Actualizar una subcategoría
Route::delete('/subcategories/{id}', [SubcategoryController::class, 'destroy']); // Eliminar una subcategoría
Route::post('/subcategories', [SubcategoryController::class, 'storeSubcategory']); // Asegúrate de que esta ruta esté bien
Route::get('/categories/{id}/subcategories', [CategoryController::class, 'getSubcategories']);



// Rutas de órdenes
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
