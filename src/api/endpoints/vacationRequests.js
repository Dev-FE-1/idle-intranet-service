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

export async function updateVacationRequests({
  employeeNumber,
  departmentNumber,
  vacationStartDate,
  vacationEndDate,
  approvalStatus,
  vacationType,
  vacationStartTime,
  vacationEndTime,
  vacationReason,
  vacationRequestDate,
  usageStatus,
}) {
  try {
    const response = await apiCall({
      endpoint: API_ENDPOINTS.VACATION_REQUESTS,
      method: 'post',
      data: {
        employeeNumber,
        departmentNumber,
        vacationStartDate,
        vacationEndDate,
        approvalStatus,
        vacationType,
        vacationStartTime,
        vacationEndTime,
        vacationReason,
        vacationRequestDate,
        usageStatus,
      },
      auth: false,
    });
    return response;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}
