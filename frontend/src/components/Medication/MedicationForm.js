import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMedication } from '../../services/medication';
import Swal from 'sweetalert2';

function MedicationForm() {
  const navigate = useNavigate();
  const [medication, setMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    start_date: '',
    end_date: '',
    notes: '',
    available_quantity: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setMedication({ ...medication, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await addMedication(medication);
      Swal.fire('Success', 'Medication added successfully', 'success');
      setTimeout(() => navigate('/medications'), 2000);
    } catch (error) {
      console.error('Error adding medication:', error);
      Swal.fire('Error', 'Failed to add medication. Please try again.', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Medication</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Medication Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={medication.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dosage" className="form-label">Dosage (ml/mg):</label>
          <input
            type="number"
            id="dosage"
            name="dosage"
            className="form-control"
            value={medication.dosage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="frequency" className="form-label">Daily Frequency:</label>
          <input
            type="number"
            id="frequency"
            name="frequency"
            className="form-control"
            value={medication.frequency}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="available_quantity" className="form-label">Available Quantity (ml/mg):</label>
          <input
            type="number"
            id="available_quantity"
            name="available_quantity"
            className="form-control"
            value={medication.available_quantity}
            onChange={handleChange}
            required
          />
          </div>
        <div className="mb-3 row">
          <label htmlFor="start_date" className="form-label col-sm-6">Start Date:</label>
          <label htmlFor="end_date" className="form-label col-sm-6">End Date:</label>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-6">
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="form-control"
              value={medication.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-6">
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="form-control"
              value={medication.end_date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            value={medication.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Medication</button>
      </form>
    </div>
  );
}

export default MedicationForm;
