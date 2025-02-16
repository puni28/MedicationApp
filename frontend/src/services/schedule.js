import api from './api';

export const getSchedule = (date) => api.get('/schedules', { params: { date } });
export const getReminderSettings = () => api.get('/schedules/reminder-settings');
export const updateReminderSettings = (settings) => api.put('/schedules/reminder-settings', settings);
export const getUpcomingDoses = () => api.get('/schedules/upcoming-doses');
export const addScheduleItem = (item) => api.post('/schedules', item);
export const getAllSchedules = () => api.get('/schedules');
export const updateScheduleItem = (id, item) => api.put(`/schedules/update/${id}`, item);
export const deleteScheduleItem = (id) => api.delete(`/schedules/delete/${id}`);
export const getScheduleItemById = (id) => api.get(`/schedules/item/${id}`);
export const getScheduleHistory = (startDate, endDate) => api.get('/schedules/history', { params: { startDate, endDate } });
export const getScheduleItemByDate = (date) => api.get(`/schedules/date/${date}`);
export const updateTaken = (id) => api.put(`/schedules/update-taken/${id}`, { id });
