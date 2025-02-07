<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     */
    protected $middleware = [
        // Agregar middlewares globales aquí
    ];

    /**
     * The application's route middleware groups.
     */
    protected $middlewareGroups = [
        'web' => [
            // Middlewares para la web
        ],
        'api' => [
            // Middlewares para la API
        ],
    ];

    /**
     * The application's route middleware.
     */
    protected $routeMiddleware = [
        // Middlewares individuales
    ];
}
