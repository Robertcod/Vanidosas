<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    'description',
    'price',
    'image',
    'category_id',
    'subcategory_id'
    ];

     // Relación con la categoría
     public function category()
     {
         return $this->belongsTo(Categories::class);
     }

     // Relación con la subcategoría (si la tienes)
     public function subcategory()
     {
         return $this->belongsTo(Subcategory::class);
     }
}
