import api from './api';

export const getNotificationAlerts = () => api.get(`/notification-alerts`);
export const updateNotificationAlert = (id, data) => api.put(`/notification-alerts/update/${id}`, data);