import { apiCall } from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchMember(id, isAdmin = false) {
  try {
    const response = await apiCall({
      endpoint: `${API_ENDPOINTS.MEMBER}/${id}`,
      method: 'get',
      params: { isAdmin },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
