import apiClient from './config';

export const submitContactForm = async (contactData) => {
  const response = await apiClient.post('/contact/', contactData);
  return response.data;
};

export const getInquiries = async () => {
  const response = await apiClient.get('/contact/');
  return response.data;
};

export const getInquiry = async (id) => {
  const response = await apiClient.get(`/contact/${id}/`);
  return response.data;
};

export const updateInquiryStatus = async (id, status) => {
  const response = await apiClient.post(`/contact/${id}/change_status/`, { status });
  return response.data;
};

export const getInquiryStats = async () => {
  const response = await apiClient.get('/contact/stats/');
  return response.data;
};