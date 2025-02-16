import React, { useState, useEffect } from 'react';
import { getReminderSettings, updateReminderSettings } from '../../services/schedule';

function ReminderSettings() {
  const [settings, setSettings] = useState({
    enableReminders: true,
    reminderTime: 15, // minutes before scheduled time
    reminderMethod: 'push', // 'push', 'email', or 'sms'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReminderSettings();
  }, []);

  const fetchReminderSettings = async () => {
    try {
      const response = await getReminderSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch reminder settings:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReminderSettings(settings);
      setMessage('Reminder settings updated successfully');
    } catch (error) {
      setMessage('Failed to update reminder settings');
    }
  };

  return (
    <div className="reminder-settings">
      <h2>Reminder Settings</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="enableReminders">Enable Reminders:</label>
          <input
            type="checkbox"
            id="enableReminders"
            name="enableReminders"
            checked={settings.enableReminders}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="reminderTime">Reminder Time (minutes before):</label>
          <input
            type="number"
            id="reminderTime"
            name="reminderTime"
            value={settings.reminderTime}
            onChange={handleChange}
            min="0"
            max="120"
          />
        </div>
        <div>
          <label htmlFor="reminderMethod">Reminder Method:</label>
          <select
            id="reminderMethod"
            name="reminderMethod"
            value={settings.reminderMethod}
            onChange={handleChange}
          >
            <option value="push">Push Notification</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default ReminderSettings;
