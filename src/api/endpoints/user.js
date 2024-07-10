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

export async function fetchWeeklyAttendances() {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.ATTENDANCE_WEEKLY,
      method: 'get',
      auth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user weekly attendances:', error);
    throw error;
  }
}

export async function updateUserProfile({ employeeNumber, profileData }) {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.UPDATE_PROFILE,
      method: 'put',
      data: { employeeNumber, profileData },
      auth: true,
    });
    return response;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}
