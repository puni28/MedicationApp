import api from './api';

export const getMedications = () => api.get('/medications');
export const getMedicationById = (id) => api.get(`/medications/${id}`);
export const addMedication = (medicationData) => api.post('/medications', medicationData);
export const updateMedication = (id, medicationData) => api.put(`/medications/update/${id}`, medicationData);
export const deleteMedication = (id) => api.delete(`/medications/delete/${id}`);
export const identifyPill = (formData) => api.post('/medications/identify', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
