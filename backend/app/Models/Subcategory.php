<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $fillable = ['name','description', 'category_id'];

    // Relación con la categoría
    public function category()
    {
        return $this->belongsTo(Categories::class ,'category_id'); // Relación de uno a muchos
    }
}
