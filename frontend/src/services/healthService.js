import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all health records for an animal
export const getHealthRecords = async (animalId, page = 1, limit = 10, filters = {}) => {
  const { startDate, endDate, severity } = filters;
  const response = await axios.get(`${API_URL}/health/animal/${animalId}`, {
    headers: getAuthHeader(),
    params: { page, limit, startDate, endDate, severity },
  });
  return response.data;
};

// Get a single health record by ID
export const getHealthRecord = async (id) => {
  const response = await axios.get(`${API_URL}/health/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Get recent health records for dashboard
export const getRecentHealthRecords = async (limit = 5) => {
  const response = await axios.get(`${API_URL}/health/recent`, {
    headers: getAuthHeader(),
    params: { limit },
  });
  return response.data;
};

// Get health statistics
export const getHealthStats = async () => {
  const response = await axios.get(`${API_URL}/health/stats`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Create a new health record
export const createHealthRecord = async (healthData) => {
  const response = await axios.post(`${API_URL}/health`, healthData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Update a health record
export const updateHealthRecord = async (id, healthData) => {
  const response = await axios.put(`${API_URL}/health/${id}`, healthData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Delete a health record
export const deleteHealthRecord = async (id) => {
  const response = await axios.delete(`${API_URL}/health/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Common symptoms by category
export const symptomCategories = {
  digestive: ['Vomiting', 'Diarrhea', 'Loss of appetite', 'Constipation', 'Bloating', 'Blood in stool'],
  respiratory: ['Coughing', 'Sneezing', 'Difficulty breathing', 'Nasal discharge', 'Wheezing', 'Rapid breathing'],
  skin: ['Itching', 'Hair loss', 'Rashes', 'Lumps', 'Hot spots', 'Dry skin', 'Wounds'],
  behavioral: ['Lethargy', 'Aggression', 'Anxiety', 'Hiding', 'Excessive barking/meowing', 'Restlessness'],
  physical: ['Limping', 'Swelling', 'Weight loss', 'Fever', 'Eye discharge', 'Ear discharge', 'Bad breath'],
  urinary: ['Frequent urination', 'Difficulty urinating', 'Blood in urine', 'Incontinence'],
};

// Get all symptoms as a flat array
export const getAllSymptoms = () => {
  return Object.values(symptomCategories).flat();
};
