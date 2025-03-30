import apiClient from './config';

export const getEvents = async (params = {}) => {
  try {
    const response = await apiClient.get('/events/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getFeaturedEvents = async () => {
  try {
    const response = await apiClient.get('/events/featured/');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get('/events/upcoming/');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

export const getPastEvents = async () => {
  try {
    const response = await apiClient.get('/events/past/');
    return response.data;
  } catch (error) {
    console.error('Error fetching past events:', error);
    throw error;
  }
};

export const getEventBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/events/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  const formData = new FormData();
  
  Object.keys(eventData).forEach(key => {
    if (key === 'image' && eventData[key] instanceof File) {
      formData.append(key, eventData[key]);
    } else {
      formData.append(key, eventData[key]);
    }
  });
  
  const response = await apiClient.post('/events/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const updateEvent = async (slug, eventData) => {
  const formData = new FormData();
  
  Object.keys(eventData).forEach(key => {
    if (key === 'image' && eventData[key] instanceof File) {
      formData.append(key, eventData[key]);
    } else {
      formData.append(key, eventData[key]);
    }
  });
  
  const response = await apiClient.patch(`/events/${slug}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const deleteEvent = async (slug) => {
  const response = await apiClient.delete(`/events/${slug}/`);
  return response.data;
};

export const addEventImage = async (eventId, imageData) => {
  const formData = new FormData();
  formData.append('event', eventId);
  formData.append('image', imageData.image);
  if (imageData.caption) {
    formData.append('caption', imageData.caption);
  }
  
  const response = await apiClient.post('/events/images/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};