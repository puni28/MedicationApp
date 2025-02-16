import React from 'react';
import './styles/global.css';
import './styles/layout.css';
import App from './App';
import api from './services/api';
import { getNotificationAlerts } from './services/notificationAlerts';
import { createRoot } from 'react-dom/client';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      setInterval(checkMedications, 300000);
      setInterval(checkSchedule, 600000);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

const checkMedications = async () => {
  try {
    const response = await api.get('/medications');
    const medications = response.data;    
    medications.forEach(med => {
      const isLowSupply = (med.available_quantity) / (med.frequency * med.dosage * (Math.ceil((new Date(med.end_date) - new Date(med.start_date)) / (1000 * 60 * 60 * 24)))) <= 0.2;
      if (isLowSupply) {
        showNotification(med, "refill");
      }
    });
  } catch (error) {
    console.error('Failed to fetch medications:', error);
  }
};

const checkSchedule = async () => {
  try {
    const response = await api.get('/schedules');
    const schedules = response.data;
    
    schedules.forEach(schedule => {
      const scheduleTime = new Date(schedule.schedule_time);
      const currentTime = new Date();
      
      const remind = (!schedule.taken) && (scheduleTime > currentTime) && 
                     ((scheduleTime - currentTime) <= 30 * 60 * 1000);
      
      if (remind) {
        console.log("Reminder:", schedule.schedule_time);
        showNotification(schedule.medication, "reminder");
      }
    });
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
  }
}

const showNotification = async (med, type) => {
  const medicationUrl = `/medications/${med.id}`; // Define the URL for the medication page
  if (type === "reminder")
  {
    const schedule = med;
    med = schedule.medication;
  }
  const scheduleUrl = `/schedule`;
  var url = "";
  var notification_text = "";
  var title = "";
  if (type === "refill") {
    try {
      const refillResponse = await getNotificationAlerts();
      const refillAlertsData = refillResponse.data.filter(alert => alert.type === 'refill_alert');
      notification_text = refillAlertsData[0].text;
      title = "Low Supply Alert";
      url = medicationUrl;
    }
    catch (error) {
      console.error('Failed to fetch notification alert:', error);
    }
  }
  else if (type === "reminder"){
    try {
      const refillResponse = await getNotificationAlerts();
      const refillAlertsData = refillResponse.data.filter(alert => alert.type === 'medication_reminder');
      notification_text = refillAlertsData[0].text;
      title = "Medication Reminder";
      url = scheduleUrl;
    }
    catch (error) {
      console.error('Failed to fetch notification alert:', error);
    }
  }
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(`${title} : ${med.name}`, {
        body: `${notification_text}`,
        data: { url: url },
      });
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(`${title} : ${med.name}`, {
            body: `${notification_text}`,
            data: { url: url },
          });
        });
      }
    });
  }
};

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App />);
