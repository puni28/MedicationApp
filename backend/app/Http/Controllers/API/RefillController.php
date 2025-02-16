<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Refill;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RefillController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $refills = auth()->user()->refills()->with('medication')->get();
        return response()->json($refills);
    }

    public function store(Request $request)
    {
        $request->validate([
            'medication_id' => 'required|exists:medications,id',
            'refill_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $refill = auth()->user()->refills()->create($request->all());

        return response()->json($refill, 201);
    }

    public function show(Refill $refill)
    {
        $this->authorize('view', $refill);
        return response()->json($refill->load('medication'));
    }

    public function update(Request $request, Refill $refill)
    {
        $this->authorize('update', $refill);

        $request->validate([
            'medication_id' => 'required|exists:medications,id',
            'refill_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $refill->update($request->all());

        return response()->json($refill);
    }

    public function destroy(Refill $refill)
    {
        $this->authorize('delete', $refill);
        $refill->delete();
        return response()->json(null, 204);
    }

    public function allRefills()
    {
        $refills = Refill::all();
        return response()->json($refills);
    }
}
