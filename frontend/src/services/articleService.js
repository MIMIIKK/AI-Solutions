// frontend/src/services/articleService.js
import apiClient from './apiClient';

const articleService = {
  getAllArticles: async () => {
    const response = await apiClient.get('/articles/');
    return response.data;
  },
  
  getArticleBySlug: async (slug) => {
    const response = await apiClient.get(`/articles/${slug}/`);
    return response.data;
  },
  
  getFeaturedArticles: async () => {
    const response = await apiClient.get('/articles/featured/');
    return response.data;
  },
  
  getArticlesByCategory: async (categorySlug) => {
    const response = await apiClient.get(`/articles/by_category/?category=${categorySlug}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await apiClient.get('/articles/categories/');
    return response.data;
  }
};

export default articleService;