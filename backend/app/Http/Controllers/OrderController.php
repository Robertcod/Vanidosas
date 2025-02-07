<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Obtener todas las órdenes
    public function index()
    {
        return response()->json(Order::all(), 200);
    }

    // Crear una orden
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'order_details' => 'required|array'
        ]);

        $order = Order::create([
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'order_details' => json_encode($request->order_details),
            'status' => 'pending'
        ]);

        return response()->json($order, 201);
    }

    // Obtener una orden por ID
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        return response()->json($order, 200);
    }

    // Actualizar el estado de una orden
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        $order->update($request->all());

        return response()->json($order, 200);
    }

    // Eliminar una orden
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Orden no encontrada'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Orden eliminada'], 200);
    }
}
