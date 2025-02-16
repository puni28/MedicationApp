import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScheduleItem } from '../../services/schedule';
import Swal from 'sweetalert2';

function CalendarForm() {
  const navigate = useNavigate();
  const [scheduleItem, setScheduleItem] = useState({
    date: '',
    medicationName: '',
    dosage: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setScheduleItem({ ...scheduleItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await addScheduleItem(scheduleItem);
      Swal.fire('Success', 'Schedule item added successfully', 'success');
      setTimeout(() => navigate('/calendar'), 2000);
    } catch (error) {
      console.error('Error adding schedule item:', error);
      Swal.fire('Error', 'Failed to add schedule item. Please try again.', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add New Schedule Item</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={scheduleItem.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medicationName" className="form-label">Medication Name:</label>
          <input
            type="text"
            id="medicationName"
            name="medicationName"
            className="form-control"
            value={scheduleItem.medicationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dosage" className="form-label">Dosage:</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            className="form-control"
            value={scheduleItem.dosage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg w-100">Add Schedule Item</button>
      </form>
    </div>
  );
}

export default CalendarForm;
