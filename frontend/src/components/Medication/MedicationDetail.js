import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMedicationById, updateMedication, deleteMedication } from '../../services/medication';
import Swal from 'sweetalert2';

function MedicationDetail() {
  const [medication, setMedication] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
  const fetchMedication = async () => {
    try {
      const response = await getMedicationById(id);
      setMedication(response.data);
    } catch (error) {
      setError('Failed to fetch medication details');
    }
  };

  useEffect(() => {
    fetchMedication();
  }, [id]);


  const handleChange = (e) => {
    setMedication({ ...medication, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateMedication(id, medication);
      setIsEditing(false);
      Swal.fire('Success', 'Medication updated successfully', 'success');
    } catch (error) {
      setError('Failed to update medication');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await deleteMedication(id);
        Swal.fire('Success', 'Medication deleted successfully', 'success');
        navigate('/medications');
      } catch (error) {
        console.error('Error deleting medication:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  if (!medication) return <div>Loading...</div>;

  return (
    <div className="container medication-detail">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/medications')}>Back to Medications</button>
      <h2 className="text-center my-4">Medication Details for "{medication.name}"</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="form-group" method='POST'>
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
              type="text"
              id="dosage"
              name="dosage"
              className="form-control"
              value={medication.dosage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="frequency" className="form-label">Frequency (times a day):</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              className="form-control"
              value={medication.frequency}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="available_quantity" className="form-label">Available Quantity:</label>
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
          <button type="submit" className="btn btn-primary me-2">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Medication Details</h5>
              <p className="card-text"><strong>Dosage:</strong> {medication.dosage} ml/mg </p>
              <p className="card-text"><strong>Frequency:</strong> {medication.frequency} times a day</p>
              <p className="card-text"><strong>Start Date:</strong> {formatDate(medication.start_date)}</p>
              <p className="card-text"><strong>End Date:</strong> {medication.end_date ? formatDate(medication.end_date) : 'N/A'}</p>
              <p className="card-text"><strong>Notes:</strong> {medication.notes || 'Not Added Yet'}</p>
              <p className="card-text"><strong>Available Quantity:</strong> {medication.available_quantity} </p>
              <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicationDetail;
