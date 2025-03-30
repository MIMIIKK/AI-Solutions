import apiClient from './config';

export const getCategories = async () => {
  const response = await apiClient.get('/blog/categories/');
  return response.data;
};

export const getPosts = async (params = {}) => {
  const response = await apiClient.get('/blog/posts/', { params });
  return response.data;
};

export const getFeaturedPosts = async () => {
  const response = await apiClient.get('/blog/posts/featured/');
  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await apiClient.get(`/blog/posts/${slug}/`);
  return response.data;
};

export const createPost = async (postData) => {
  const formData = new FormData();
  
  Object.keys(postData).forEach(key => {
    if (key === 'image' && postData[key] instanceof File) {
      formData.append(key, postData[key]);
    } else if (key === 'categories') {
      postData[key].forEach(categoryId => {
        formData.append('categories', categoryId);
      });
    } else {
      formData.append(key, postData[key]);
    }
  });
  
  const response = await apiClient.post('/blog/posts/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const updatePost = async (slug, postData) => {
  const formData = new FormData();
  
  Object.keys(postData).forEach(key => {
    if (key === 'image' && postData[key] instanceof File) {
      formData.append(key, postData[key]);
    } else if (key === 'categories') {
      postData[key].forEach(categoryId => {
        formData.append('categories', categoryId);
      });
    } else {
      formData.append(key, postData[key]);
    }
  });
  
  const response = await apiClient.patch(`/blog/posts/${slug}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const deletePost = async (slug) => {
  const response = await apiClient.delete(`/blog/posts/${slug}/`);
  return response.data;
};