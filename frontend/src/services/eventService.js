// frontend/src/services/eventService.js
import apiClient from './apiClient';

const eventService = {
  getAllEvents: async () => {
    const response = await apiClient.get('/events/');
    return response.data;
  },
  
  getEventBySlug: async (slug) => {
    const response = await apiClient.get(`/events/${slug}/`);
    return response.data;
  },
  
  getUpcomingEvents: async () => {
    const response = await apiClient.get('/events/?type=upcoming');
    return response.data;
  },
  
  getPastEvents: async () => {
    const response = await apiClient.get('/events/?type=past');
    return response.data;
  }
};

export default eventService;