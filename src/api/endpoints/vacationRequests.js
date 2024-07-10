import { apiCall } from '../apiClient.js';
import { API_ENDPOINTS } from '../config.js';

export async function fetchVacationRequests(
  employeeNumber,
  page = 1,
  max = 10,
) {
  try {
    const response = await apiCall({
      endpoint: `${API_ENDPOINTS.VACATION_REQUESTS}/${page}`,
      method: 'get',
      params: { employeeNumber, max },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch vacation requests for employee ${employeeNumber}:`,
      error,
    );
    throw error;
  }
}
