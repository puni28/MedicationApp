import React, { useState, useEffect } from 'react';
import { getMedicationHistory } from '../../services/tracking';

function MedicationHistory() {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchMedicationHistory = async () => {
    try {
      const response = await getMedicationHistory(startDate, endDate);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch medication history:', error);
    }
  };

  useEffect(() => {
    fetchMedicationHistory();
  }, [startDate, endDate]);

  return (
    <div className="medication-history container mt-4">
      <h2 className="text-center">Medication History</h2>
      <div className="date-filters mb-3">
        <label htmlFor="startDate" className="form-label">Start Date:</label>
        <input
          type="date"
          id="startDate"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate" className="form-label">End Date:</label>
        <input
          type="date"
          id="endDate"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Taken</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.medicationName}</td>
              <td>{item.dosage}</td>
              <td>{item.taken ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationHistory;
