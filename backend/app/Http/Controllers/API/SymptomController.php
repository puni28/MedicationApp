<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Symptom;
use Illuminate\Http\Request;

class SymptomController extends Controller
{
    public function index()
    {
        $symptoms = auth()->user()->symptoms;
        return response()->json($symptoms);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'severity' => 'required|integer|min:1|max:10',
            'date' => 'required|date',
        ]);

        $symptom = auth()->user()->symptoms()->create($request->all());

        return response()->json($symptom, 201);
    }

    public function show(Symptom $symptom)
    {
        $this->authorize('view', $symptom);
        return response()->json($symptom);
    }

    public function update(Request $request, Symptom $symptom)
    {
        $this->authorize('update', $symptom);

        $request->validate([
            'name' => 'required|string|max:255',
            'severity' => 'required|integer|min:1|max:10',
            'date' => 'required|date',
        ]);

        $symptom->update($request->all());

        return response()->json($symptom);
    }

    public function destroy(Symptom $symptom)
    {
        $this->authorize('delete', $symptom);
        $symptom->delete();
        return response()->json(null, 204);
    }
}