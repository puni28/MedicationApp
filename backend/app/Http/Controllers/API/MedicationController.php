<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Medication;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MedicationController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $medications = auth()->user()->medications;
        return response()->json($medications);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'dosage' => 'required|numeric|min:1',
            'frequency' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'notes' => 'nullable|string',
            'available_quantity' => 'required|integer|min:0',
        ]);

        $medication = auth()->user()->medications()->create($request->all());

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $frequency = $request->input('frequency');
        $startTime = '08:00:00';
        $endTime = '20:00:00';

        $startDateTime = \Carbon\Carbon::parse($startDate . ' ' . $startTime);
        $endDateTime = \Carbon\Carbon::parse($endDate . ' ' . $endTime);

        while ($startDateTime <= $endDateTime) {
            $startDateTime->setTime(8, 0, 0);
            $dailyEndDateTime = $startDateTime->copy()->setTime(20, 0, 0);
            for ($i = 0; $i < $frequency; $i++) {
                $diffInHours = $startDateTime->diffInHours($dailyEndDateTime);
                $hoursPerDose = $diffInHours / ($frequency - 1);
                $scheduledTime = $startDateTime->copy()->addHours($hoursPerDose * $i);
                auth()->user()->schedules()->create([
                    'medication_id' => $medication->id,
                    'scheduled_time' => $scheduledTime,
                    'scheduled_date' => $startDateTime,
                    'taken' => false,
                ]);
            }

            $startDateTime->addDay();
        }




        return response()->json($medication, 201);
    }

    public function show(Medication $medication)
    {
        $this->authorize('view', $medication);
        return response()->json($medication);
    }

    public function update(Request $request, Medication $medication)
    {
        $this->authorize('update', $medication);

        $request->validate([
            'name' => 'required|string|max:255',
            'dosage' => 'required|numeric|min:1',
            'frequency' => 'required|integer|min:1',
            'available_quantity' => 'required|integer|min:1',
        ]);

        $medication->update($request->all());

        return response()->json($medication);
    }

    public function destroy(Medication $medication)
    {
        $this->authorize('delete', $medication);
        $medication->delete();
        return response()->json(null, 204);
    }
}