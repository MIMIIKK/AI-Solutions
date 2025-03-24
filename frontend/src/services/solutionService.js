// frontend/src/services/solutionService.js
import apiClient from './apiClient';

const solutionService = {
  getAllSolutions: async () => {
    const response = await apiClient.get('/solutions/');
    return response.data;
  },
  
  getSolutionBySlug: async (slug) => {
    const response = await apiClient.get(`/solutions/${slug}/`);
    return response.data;
  },
  
  getFeaturedSolutions: async () => {
    const response = await apiClient.get('/solutions/featured/');
    return response.data;
  },
  
  getSolutionTestimonials: async (slug) => {
    const response = await apiClient.get(`/solutions/${slug}/testimonials/`);
    return response.data;
  }
};

export default solutionService;