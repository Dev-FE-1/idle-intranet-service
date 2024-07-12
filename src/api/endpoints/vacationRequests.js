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
  departmentNumber = 10,
  vacationStartDate,
  vacationEndDate,
  approvalStatus = '미승인',
  vacationType,
  vacationStartTime = '18:15',
  vacationEndTime = '18:15',
  vacationReason,
  vacationRequestDate = '2024-07-12',
  usageStatus = '미사용',
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
        usageStatus
      },
      auth: false,
    });
    return response;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}
