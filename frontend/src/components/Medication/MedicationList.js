import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedications } from '../../services/medication';

function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await getMedications();
      setMedications(response.data);
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Medications</h2>
      <Link to="/medications/add" className="btn btn-primary mb-3">Add New Medication</Link>
      <ul className="list-group">
        {medications.length > 0 ? (
          medications.map((med) => (
            <li key={med.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/medications/${med.id}`} className="text-decoration-none">{med.name}</Link>
              <div>
                <span className="badge bg-secondary me-2">{med.dosage} ml/mg</span>
                <span className="badge bg-info me-2">{med.frequency} times a day</span>
                {(med.available_quantity) / ( med.frequency * med.dosage * (Math.ceil((new Date(med.end_date) - new Date(med.start_date)) / (1000 * 60 * 60 * 24)))) <= 0.2 ?
                (<span className="badge bg-danger">{med.available_quantity} ml/mg (Low supply)</span>) :
                (<span className="badge bg-info me-2">{med.available_quantity} ml/mg available</span>)
                }
                <span className="badge bg-danger">From {new Date(med.start_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} to {new Date(med.end_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item d-flex justify-content-center align-items-center">
            No medications have been added yet.
          </li>
        )}
      </ul>
    </div>
  );
}

export default MedicationList;
