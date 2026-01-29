import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all animals for the logged-in user
export const getAnimals = async (page = 1, limit = 10, search = '') => {
  const response = await axios.get(`${API_URL}/animals`, {
    headers: getAuthHeader(),
    params: { page, limit, search },
  });
  return response.data;
};

// Get a single animal by ID
export const getAnimal = async (id) => {
  const response = await axios.get(`${API_URL}/animals/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Create a new animal
export const createAnimal = async (animalData) => {
  const response = await axios.post(`${API_URL}/animals`, animalData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Update an animal
export const updateAnimal = async (id, animalData) => {
  const response = await axios.put(`${API_URL}/animals/${id}`, animalData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Delete an animal
export const deleteAnimal = async (id) => {
  const response = await axios.delete(`${API_URL}/animals/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Get animal statistics
export const getAnimalStats = async () => {
  const response = await axios.get(`${API_URL}/animals/stats`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export default {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalStats,
};
