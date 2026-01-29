import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get auth headers
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Response with token and user
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response with token and user
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user data
 * @param {string} token - JWT token
 * @returns {Promise<Object>} Response with user data
 */
export const getCurrentUser = async (token) => {
  try {
    const response = await api.get('/auth/me', {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile
 * @param {string} token - JWT token
 * @param {Object} profileData - Profile update data
 * @returns {Promise<Object>} Response with updated user
 */
export const updateProfile = async (token, profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData, {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Change user password
 * @param {string} token - JWT token
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Response with new token
 */
export const changePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await api.put(
      '/auth/password',
      { currentPassword, newPassword },
      { headers: getAuthHeaders(token) }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
};
