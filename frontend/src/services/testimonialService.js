// frontend/src/services/testimonialService.js
import apiClient from './apiClient';

const testimonialService = {
  getAllTestimonials: async () => {
    const response = await apiClient.get('/testimonials/');
    return response.data;
  },
  
  getFeaturedTestimonials: async () => {
    const response = await apiClient.get('/testimonials/featured/');
    return response.data;
  },
  
  submitRating: async (ratingData) => {
    const response = await apiClient.post('/testimonials/ratings/', ratingData);
    return response.data;
  }
};

export default testimonialService;