<?php

namespace App\Services;
use App\Models\Medication;
use Toastr;
class NotificationService
{
    public static function sendRefillNotification()
    {
        $medications = Medication::get();
        foreach ($medications as $medication) {
            if ($medication->available_quantity < ($medication->dosage * $medication->frequency * 0.2)) {
                Toastr::info($medication->name . ' is running low on stock');
            }
        }
    }
} 