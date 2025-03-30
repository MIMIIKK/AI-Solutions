import apiClient from './config';

export const getProjects = async () => {
  const response = await apiClient.get('/projects/');
  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await apiClient.get('/projects/featured/');
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}/`);
  return response.data;
};

export const createProject = async (projectData) => {
  const formData = new FormData();
  
  Object.keys(projectData).forEach(key => {
    if (key === 'image' && projectData[key] instanceof File) {
      formData.append(key, projectData[key]);
    } else {
      formData.append(key, projectData[key]);
    }
  });
  
  const response = await apiClient.post('/projects/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const updateProject = async (slug, projectData) => {
  const formData = new FormData();
  
  Object.keys(projectData).forEach(key => {
    if (key === 'image' && projectData[key] instanceof File) {
      formData.append(key, projectData[key]);
    } else {
      formData.append(key, projectData[key]);
    }
  });
  
  const response = await apiClient.patch(`/projects/${slug}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const deleteProject = async (slug) => {
  const response = await apiClient.delete(`/projects/${slug}/`);
  return response.data;
};

export const addProjectImage = async (projectId, imageData) => {
  const formData = new FormData();
  formData.append('project', projectId);
  formData.append('image', imageData.image);
  if (imageData.caption) {
    formData.append('caption', imageData.caption);
  }
  
  const response = await apiClient.post('/projects/images/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};