import apiClient from './config';

export const login = async (username, password) => {
  const response = await apiClient.post('/accounts/login/', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/accounts/logout/');
  return response.data;
};

export const checkAuth = async () => {
  const response = await apiClient.get('/accounts/check-auth/');
  return response.data;
};