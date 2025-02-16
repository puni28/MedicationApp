import React, { useState, useEffect } from 'react';
import { getSymptoms, addSymptom } from '../../services/tracking';

function SymptomTracker() {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 1,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await getSymptoms();
      setSymptoms(response.data);
    } catch (error) {
      console.error('Failed to fetch symptoms:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewSymptom({ ...newSymptom, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSymptom(newSymptom);
      setNewSymptom({
        name: '',
        severity: 1,
        date: new Date().toISOString().split('T')[0],
      });
      fetchSymptoms();
    } catch (error) {
      console.error('Failed to add symptom:', error);
    }
  };

  return (
    <div className="symptom-tracker container">
      <h2 className="mt-4">Symptom Tracker</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Symptom:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={newSymptom.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="severity" className="form-label">Severity (1-10):</label>
          <input
            type="number"
            id="severity"
            name="severity"
            className="form-control"
            min="1"
            max="10"
            value={newSymptom.severity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={newSymptom.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Symptom</button>
      </form>
      <h3 className="mt-4">Symptom History</h3>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symptom</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {symptoms.map((symptom) => (
            <tr key={symptom.id}>
              <td>{new Date(symptom.date).toLocaleDateString()}</td>
              <td>{symptom.name}</td>
              <td>{symptom.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SymptomTracker;
