import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = (username, password) => {
  return axios.post(`${API_URL}/signin`, { username, password });
};

export const register = (username, password, phone) => {
  return axios.post(`${API_URL}/signup`, { username, password, phone });
};

export const logout = () => {
  // Clear local storage is handled in the context
  return Promise.resolve();
};