<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'menu_id', 'name', 'parent_id', 'depth'];
    protected $keyType = 'uuid';
    public $incrementing = false;

    // Each menu item belongs to a specific menu
    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    // Self-referencing relationship to allow hierarchical nesting
    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->with('children');
    }
}
