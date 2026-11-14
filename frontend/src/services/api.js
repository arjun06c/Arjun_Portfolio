import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const sendContactMessage = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Unable to connect to backend server. Please verify your connection or try again later.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

export const getCodingSummary = async (forceRefresh = false) => {
  try {
    const response = await apiClient.get(`/coding/summary${forceRefresh ? '?refresh=true' : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coding summary:', error.message);
    throw error;
  }
};

export const getLeetCodeStats = async (forceRefresh = false) => {
  try {
    const response = await apiClient.get(`/coding/leetcode${forceRefresh ? '?refresh=true' : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error.message);
    throw error;
  }
};

export const getGitHubStats = async (forceRefresh = false) => {
  try {
    const response = await apiClient.get(`/coding/github${forceRefresh ? '?refresh=true' : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.warn('Backend health check warning:', error.message);
    return null;
  }
};
