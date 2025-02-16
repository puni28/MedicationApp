import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScheduleItemById, updateScheduleItem, deleteScheduleItem } from '../../services/schedule';
import Swal from 'sweetalert2';

function CalendarDetail() {
  const [scheduleItem, setScheduleItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
  const fetchScheduleItem = async () => {
    try {
      const response = await getScheduleItemById(id);
      setScheduleItem(response.data);
    } catch (error) {
      setError('Failed to fetch schedule item details');
    }
  };

  useEffect(() => {
    fetchScheduleItem();
  }, [id]);

  const handleChange = (e) => {
    setScheduleItem({ ...scheduleItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateScheduleItem(id, scheduleItem);
      setIsEditing(false);
      Swal.fire('Success', 'Schedule item updated successfully', 'success');
    } catch (error) {
      setError('Failed to update schedule item');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this schedule item?')) {
      try {
        await deleteScheduleItem(id);
        Swal.fire('Success', 'Schedule item deleted successfully', 'success');
        navigate('/calendar');
      } catch (error) {
        console.error('Error deleting schedule item:', error);
      }
    }
  };

  if (!scheduleItem) return <div>Loading...</div>;

  return (
    <div className="container schedule-detail mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/calendar')}>Back to Calendar</button>
      <h2 className="text-center my-4">{scheduleItem.medicationName}</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="form-group" method='POST'>
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
          <button type="submit" className="btn btn-primary me-2">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="mt-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Schedule Item Details</h5>
              <p className="card-text"><strong>Dosage:</strong> {scheduleItem.dosage}</p>
              <p className="card-text"><strong>Date:</strong> {new Date(scheduleItem.date).toLocaleDateString()}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarDetail;
