<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ScheduleController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $schedules = auth()->user()->schedules()->with('medication')->get();
        return response()->json($schedules);
    }

    public function store(Request $request)
    {
        $request->validate([
            'medication_id' => 'required|exists:medications,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'required|date',
            'taken' => 'boolean',
        ]);

        $schedule = auth()->user()->schedules()->create($request->all());

        return response()->json($schedule, 201);
    }

    public function show(Schedule $schedule = null)
    {
        $schedule = $schedule ?? auth()->user()->schedules();  
        $this->authorize('view', $schedule);
        return response()->json($schedule->load('medication'));
    }

    public function update(Request $request, Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $request->validate([
            'medication_id' => 'required|exists:medications,id',
            'scheduled_time' => 'required|date',
            'taken' => 'boolean',
        ]);

        $schedule->update($request->all());

        return response()->json($schedule);
    }

    public function destroy(Schedule $schedule)
    {
        $this->authorize('delete', $schedule);
        $schedule->delete();
        return response()->json(null, 204);
    }

    public function schedulesByDate($date)
    {
        $date = \Carbon\Carbon::parse($date)->format('Y-m-d');
        $schedules = auth()->user()->schedules()->where('scheduled_date', $date)->orderBy('scheduled_time', 'asc')->get();
        $formattedSchedules = [];
        foreach ($schedules as $schedule) {
            $formattedSchedules[$schedule->medication->name][] = [
                'id' => $schedule->id,
                'medication_id' => $schedule->medication_id,
                'medication_name' => $schedule->medication->name,
                'schedule_date' => $schedule->scheduled_date,
                'schedule_time' => $schedule->scheduled_time,
                'taken' => $schedule->taken,
            ];
        }
        return response()->json($formattedSchedules);
    }

    public function updateTaken(Schedule $schedule)
    {
        $this->authorize('update', $schedule);
        if ($schedule->taken) {
            $schedule->update(['taken' => false]);
            $schedule->medication->increment('available_quantity', (int)$schedule->medication->dosage);
        } else {
            if ($schedule->medication->available_quantity >= ($schedule->medication->dosage)) {
                $schedule->update(['taken' => true]);
                $schedule->medication->decrement('available_quantity', (int)$schedule->medication->dosage);
            }
        }
        return $this->schedulesByDate($schedule->scheduled_date);
    }
}
