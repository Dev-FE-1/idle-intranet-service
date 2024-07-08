import { apiCall } from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchAnnouncements() {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.ANNOUNCEMENTS,
      method: 'get',
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    throw error;
  }
}
