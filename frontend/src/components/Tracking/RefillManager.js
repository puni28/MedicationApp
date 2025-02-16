import React, { useState, useEffect } from 'react';
import { getRefills, updateRefill } from '../../services/tracking';

function RefillManager() {
  const [refills, setRefills] = useState([]);

  useEffect(() => {
    fetchRefills();
  }, []);

  const fetchRefills = async () => {
    try {
      const response = await getRefills();
      setRefills(response.data);
    } catch (error) {
      console.error('Failed to fetch refills:', error);
    }
  };

  const handleRefill = async (id) => {
    try {
      await updateRefill(id, { refilled: true });
      fetchRefills();
    } catch (error) {
      console.error('Failed to update refill:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Refill Manager</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Medication</th>
            <th>Current Supply</th>
            <th>Refill Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {refills.map((refill) => (
            <tr key={refill.id}>
              <td>{refill.medicationName}</td>
              <td>{refill.currentSupply} days</td>
              <td>{new Date(refill.refillDate).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleRefill(refill.id)} disabled={refill.refilled}>
                  {refill.refilled ? 'Refilled' : 'Mark as Refilled'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RefillManager;
