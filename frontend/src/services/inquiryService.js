// frontend/src/services/inquiryService.js
import apiClient from './apiClient';

const inquiryService = {
  submitInquiry: async (inquiryData) => {
    const response = await apiClient.post('/inquiries/', inquiryData);
    return response.data;
  }
};

export default inquiryService;