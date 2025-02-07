<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description']; // Campos que se pueden asignar masivamente

    // Relación con los productos
    public function products()
    {
        return $this->hasMany(Product::class); // Relación de uno a muchos
    }

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class, 'category_id'); // Relación de uno a muchos
    }
}
