import React, { useState, useEffect } from 'react';
import { getScheduleHistory } from '../../services/schedule';

function CalendarHistory() {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchScheduleHistory = async () => {
    try {
      const response = await getScheduleHistory(startDate, endDate);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch schedule history:', error);
    }
  };

  useEffect(() => {
    fetchScheduleHistory();
  }, [startDate, endDate]);

  return (
    <div className="schedule-history container mt-4">
      <h2 className="text-center mb-4">Schedule History</h2>
      <div className="date-filters mb-4">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label">Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="endDate" className="form-label">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Medication</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.medicationName}</td>
                <td>{item.dosage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarHistory;
