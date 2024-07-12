import { apiCall } from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchAttendances(employeeNumber, page = 1, max = 10) {
  try {
    const response = await apiCall({
      endpoint: `${API_ENDPOINTS.ATTENDANCE}/${page}`,
      method: 'get',
      params: { employeeNumber, max },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user weekly attendances:', error);
    throw error;
  }
}
