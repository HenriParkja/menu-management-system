<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name'];
    protected $keyType = 'uuid';
    public $incrementing = false;

    // Relationship to get all items within a menu
    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'menu_id')->with('children');
    }
}

