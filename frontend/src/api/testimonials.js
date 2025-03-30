import apiClient from './config';

export const getTestimonials = async (params = {}) => {
  const response = await apiClient.get('/testimonials/', { params });
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const formData = new FormData();
  
  Object.keys(testimonialData).forEach(key => {
    if (key === 'photo' && testimonialData[key] instanceof File) {
      formData.append(key, testimonialData[key]);
    } else {
      formData.append(key, testimonialData[key]);
    }
  });
  
  const response = await apiClient.post('/testimonials/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const approveTestimonial = async (id) => {
  const response = await apiClient.post(`/testimonials/${id}/approve/`);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await apiClient.delete(`/testimonials/${id}/`);
  return response.data;
};