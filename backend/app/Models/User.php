<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function medications()
    {
        return $this->hasMany(Medication::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function symptoms()
    {
        return $this->hasMany(Symptom::class);
    }

    public function refills()
    {
        return $this->hasMany(Refill::class);
    }
}