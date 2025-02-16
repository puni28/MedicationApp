<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationAlert extends Model
{
    protected $fillable = ["user_id", "type", "text"];
    protected $casts = [
        'text' => 'string',
        'type' => 'string'
    ];    
    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
