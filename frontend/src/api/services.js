import apiClient from './config';

export const getServices = async () => {
  const response = await apiClient.get('/services/');
  return response.data;
};

export const getFeaturedServices = async () => {
  const response = await apiClient.get('/services/featured/');
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await apiClient.get(`/services/${slug}/`);
  return response.data;
};

export const createService = async (serviceData) => {
  const formData = new FormData();
  
  Object.keys(serviceData).forEach(key => {
    if (key === 'image' && serviceData[key] instanceof File) {
      formData.append(key, serviceData[key]);
    } else {
      formData.append(key, serviceData[key]);
    }
  });
  
  const response = await apiClient.post('/services/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const updateService = async (slug, serviceData) => {
  const formData = new FormData();
  
  Object.keys(serviceData).forEach(key => {
    if (key === 'image' && serviceData[key] instanceof File) {
      formData.append(key, serviceData[key]);
    } else {
      formData.append(key, serviceData[key]);
    }
  });
  
  const response = await apiClient.patch(`/services/${slug}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const deleteService = async (slug) => {
  const response = await apiClient.delete(`/services/${slug}/`);
  return response.data;
};