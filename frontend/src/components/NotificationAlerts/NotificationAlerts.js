import React, { useState, useEffect } from 'react';
import { getNotificationAlerts, updateNotificationAlert } from '../../services/notificationAlerts';
import Swal from 'sweetalert2';

function NotificationAlerts() {
  const [refillAlerts, setRefillAlerts] = useState([]);
  const [reminderAlerts, setReminderAlerts] = useState([]);
  const [error, setError] = useState('');

  const fetchAlerts = async () => {
    try {
      const refillResponse = await getNotificationAlerts();
      const refillAlertsData = refillResponse.data.filter(alert => alert.type === 'refill_alert');
      setRefillAlerts(refillAlertsData);      
    } catch (error) {
      setError('Failed to fetch refill alerts');
      console.error('Error fetching refill alerts:', error.response ? error.response.data : error);
    }
    try
    {
      const reminderResponse = await getNotificationAlerts();
      const scheduleAlertssData = reminderResponse.data.filter(alert => alert.type === 'medication_reminder');
      setReminderAlerts(scheduleAlertssData);      

    } catch (error) {
      setError('Failed to fetch schedule alerts');
      console.error('Error fetching schedule alerts:', error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleUpdateRefill = async () => {
    try {
      const alert = refillAlerts[0]
      await updateNotificationAlert(alert.id, alert);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Refill Alert Notifications updated successfully`,
      });
    } catch (error) {
      setError(`Failed to update Refill Alert notifications`);
      console.error('Error updating notifications:', error.response ? error.response.data : error);
    }
  };

  const handleUpdateReminder = async () => {
    try {
      const alert = reminderAlerts[0];
      await updateNotificationAlert(alert.id, alert);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Medication Reminder Notifications updated successfully`,
      });
    } catch (error) {
      setError(`Failed to update Medication Reminder notifications`);
      console.error('Error updating notifications:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container notification-alerts">
      <h2 className="text-center my-4">Notification for Refill</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateRefill(); }}>
        {refillAlerts.map((alert, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              className="form-control"
              value={alert.text}
              onChange={(e) => {
                const newAlerts = [...refillAlerts];
                newAlerts[index].text = e.target.value;
                setRefillAlerts(newAlerts);
              }}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Update Refill Alerts</button>
      </form>

      <h2 className="text-center my-4">Notification for Medication Reminder</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateReminder(); }}>
        {reminderAlerts.map((alert, index) => (
          <div key={index} className="form-group">
            <input
            type="hidden"
            value={alert.id}
            />
            <input
              type="text"
              className="form-control"
              value={alert.text}
              onChange={(e) => {
                const newAlerts = [...reminderAlerts];
                newAlerts[index].text = e.target.value;
                setReminderAlerts(newAlerts);
              }}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Update Reminder Alerts</button>
      </form>
    </div>
  );
}

export default NotificationAlerts;