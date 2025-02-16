<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MedicationController;
use App\Http\Controllers\API\ScheduleController;
use App\Http\Controllers\API\SymptomController;
use App\Http\Controllers\API\RefillController;
use App\Http\Controllers\API\NotificationAlertController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [AuthController::class, 'user']);

    Route::apiResource('/medications', MedicationController::class);
    Route::apiResource('/tracking/schedule', ScheduleController::class);
    Route::apiResource('/tracking/symptoms', SymptomController::class);
    Route::apiResource('/tracking/refills', RefillController::class);
    Route::get('/medications/{medication}', [MedicationController::class, 'show']);
    Route::put('/medications/update/{medication}', [MedicationController::class, 'update']);
    Route::delete('/medications/delete/{medication}', [MedicationController::class, 'destroy']);
    Route::apiResource('/schedules', ScheduleController::class);
    Route::get('/schedules/{schedule}', [ScheduleController::class, 'show']);
    Route::put('/schedules/update/{schedule}', [ScheduleController::class, 'update']);
    Route::delete('/schedules/delete/{schedule}', [ScheduleController::class, 'destroy']);
    Route::apiResource('/symptoms', SymptomController::class);
    Route::get('/symptoms/{symptom}', [SymptomController::class, 'show']);
    Route::put('/symptoms/update/{symptom}', [SymptomController::class, 'update']);
    Route::delete('/symptoms/delete/{symptom}', [SymptomController::class, 'destroy']);
    Route::apiResource('/refills', RefillController::class);
    Route::get('/refills/{refill}', [RefillController::class, 'show']);
    Route::put('/refills/update/{refill}', [RefillController::class, 'update']);
    Route::delete('/refills/delete/{refill}', [RefillController::class, 'destroy']);
    Route::get('/schedules/date/{date}', [ScheduleController::class, 'schedulesByDate']);
    Route::put('/schedules/update-taken/{schedule}', [ScheduleController::class, 'updateTaken']);
    Route::get('/refills/all', [RefillController::class, 'allRefills']);
    Route::apiResource('/notification-alerts', NotificationAlertController::class);
    Route::put('/notification-alerts/update/{notificationAlert}', [NotificationAlertController::class, 'update']);
});
