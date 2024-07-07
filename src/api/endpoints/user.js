import { apiCall } from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchUser() {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.USER,
      method: 'get',
      auth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
