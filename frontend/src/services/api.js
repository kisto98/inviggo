import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const getAdvertisements = (filters) => {
  return api.get('/ads', { params: filters });
};

export const getAdvertisementById = (id) => {
  return api.get(`/ads/${id}`);
};

export const createAdvertisement = (adData) => {
  return api.post('/ads', adData);
};

export const updateAdvertisement = (id, adData) => {
  return api.put(`/ads/${id}`, adData);
};

export const deleteAdvertisement = (id) => {
  return api.delete(`/ads/${id}`);
};