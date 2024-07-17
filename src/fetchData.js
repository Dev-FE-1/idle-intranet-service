import axios from 'axios';

const { VITE_SERVER_URL } = import.meta.env;
const apiBaseUrl = VITE_SERVER_URL;

// let에 데이터를 담아서 리턴하는 이유가 있나요?
// try catch를 적용해보자

export async function fetchMembers(page = 1, max = 10) {
  const response = await axios.get(
    `${apiBaseUrl}/api/members/${page}?max=${max}`,
  );
  let members;

  if (response.status === 200) {
    members = response.data.data;
  }

  return members;
}

export async function fetchMember(employeeNumber) {
  const isAdmin = false; // 임시

  if (!employeeNumber) {
    console.error('사원 번호가 필요합니다');
  }

  const response = await fetch(
    `${apiBaseUrl}/api/member/${employeeNumber}?isAdmin=${isAdmin}`,
  );
  let member;

  if (response.status === 200) {
    member = await response.json();
  }

  return member.data;
}

export async function fetchAttendance(employeeNumber, page = 1, max = 10) {
  if (!employeeNumber) {
    console.error('사원 번호가 필요합니다');
  }

  const response = await axios.get(
    `${apiBaseUrl}/api/attendance/${page}?employeeNumber=${employeeNumber}&max=${max}`,
  );
  let attendance;

  if (response.status === 200) {
    attendance = response.data.data;
  }

  return attendance;
}

export async function fetchVacationRequests(
  employeeNumber,
  page = 1,
  max = 10,
) {
  if (!employeeNumber) {
    console.error('사원 번호가 필요합니다');
  }

  const response = await axios.get(
    `${apiBaseUrl}/api/vacationRequests/${page}?employeeNumber=${employeeNumber}&max=${max}`,
  );
  let vacationRequests;

  if (response.status === 200) {
    vacationRequests = response.data.data;
  }

  return vacationRequests;
}

export async function fetchDepartments() {
  const response = await axios.get(`${apiBaseUrl}/api/departments`);
  let departments;

  if (response.status === 200) {
    departments = response.data.data;
  }

  return departments;
}

export async function fetchAnnouncements() {
  const response = await axios.get(`${apiBaseUrl}/api/announcements`);
  let announcements;

  if (response.status === 200) {
    announcements = response.data.data;
  }

  return announcements;
}

export async function fetchAnnouncement(id) {
  if (!id) {
    console.error('공지 아이디가 필요합니다');
  }
  const response = await axios.get(`${apiBaseUrl}/api/announcements/${id}`);
  let announcement;

  if (response.status === 200) {
    announcement = response.data.data;
  }

  return announcement;
}

export async function fetchUser() {
  const employeeNumber = localStorage.getItem('EmployeeNumber') || 100; // 임시
  const response = await fetch(
    `${apiBaseUrl}/api/user?employeeNumber=${employeeNumber}`,
  );
  let user;

  if (response.status === 200) {
    user = await response.json();
  }

  return user.data;
}
