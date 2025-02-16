<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Medication;
use App\Models\Schedule;
use App\Models\Symptom;
use App\Models\Refill;
use App\Policies\MedicationPolicy;
use App\Policies\SchedulePolicy;
use App\Policies\SymptomPolicy;
use App\Policies\RefillPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Medication::class => MedicationPolicy::class,
        Schedule::class => SchedulePolicy::class,
        Symptom::class => SymptomPolicy::class,
        Refill::class => RefillPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}