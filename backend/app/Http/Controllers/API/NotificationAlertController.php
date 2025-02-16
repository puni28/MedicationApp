<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NotificationAlert;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Log;
class NotificationAlertController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $refillAlert = NotificationAlert::where("user_id", auth()->user()->id)->where("type", "refill_alert")->first();
        $medicationReminder = NotificationAlert::where("user_id", auth()->user()->id)->where("type", "medication_reminder")->first();
        $notificationAlerts = collect([$refillAlert, $medicationReminder]);
        return response()->json($notificationAlerts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255',
            'text' => 'required|string',
        ]);

        $notificationAlert = auth()->user()->notificationAlerts()->create($request->all());
        return response()->json($notificationAlert, 201);
    }

    public function show(NotificationAlert $notificationAlert)
    {
        $this->authorize('view', $notificationAlert);
        return response()->json($notificationAlert);
    }

    public function update(Request $request, NotificationAlert $notificationAlert)
    {
        $this->authorize('update', $notificationAlert);
        $request->validate([
            'type' => 'required|string|max:255',
            'text' => 'required|string',
        ]);

        $notificationAlert->update([
            'type' => $request->input('type'),
            'text' => $request->input('text'),
        ]);
        return response()->json($notificationAlert);
    }


    public function destroy(NotificationAlert $notificationAlert)
    {
        $this->authorize('delete', $notificationAlert);
        $notificationAlert->delete();
        return response()->json(null, 204);
    }
}
