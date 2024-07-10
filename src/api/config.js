const { VITE_SERVER_URL } = import.meta.env;

if (!VITE_SERVER_URL) {
  console.log(
    'server url이 존재하지 않습니다. 기본 url(localhost:8080)을 사용합니다.',
  );
}

export const API_BASE_URL = VITE_SERVER_URL || 'http://localhost:8080';

const apiUrl = (path) => {
  const baseUrl = API_BASE_URL.endsWith('/')
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  return `${baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;
};

export const API_ENDPOINTS = {
  MEMBERS: apiUrl('api/members'),
  MEMBER: apiUrl('api/member'),
  ATTENDANCE: apiUrl('api/attendance'),
  ATTENDANCE_WEEKLY: apiUrl('api/attendance/weekly'),
  VACATION_REQUESTS: apiUrl('api/vacationRequests'),
  DEPARTMENTS: apiUrl('api/departments'),
  ANNOUNCEMENTS: apiUrl('api/announcements'),
  USER: apiUrl('api/user'),
  UPDATE_PROFILE: apiUrl('api/updateProfile'),
};
