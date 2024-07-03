import axios from 'axios';

const { VITE_SERVER_URL } = import.meta.env;

export async function fetchMembers() {
  const response = await axios.get(`${VITE_SERVER_URL}/api/members`);
  let members;

  if (response.status === 200) {
    members = response.data.data;
  }

  return members;
}

export async function fetchMember(employeeNumber) {
  const isAdmin = false; // 임시

  const response = await fetch(
    `${VITE_SERVER_URL}/api/members/${employeeNumber}?isAdmin=${isAdmin}`,
  );
  let member;

  if (response.status === 200) {
    member = await response.json();
  }

  return member.data;
}

export async function fetchAttendance(employeeNumber) {
  const response = await axios.get(
    `${VITE_SERVER_URL}/api/attendance?employeeNumber=${employeeNumber}`,
  );
  let attendance;

  if (response.status === 200) {
    attendance = response.data.data;
  }

  return attendance;
}

export async function fetchVacationRequest(employeeNumber) {
  const response = await axios.get(
    `${VITE_SERVER_URL}/api/vacationRequests?employeeNumber=${employeeNumber}`,
  );
  let vacationRequests;

  if (response.status === 200) {
    vacationRequests = response.data.data;
  }

  return vacationRequests;
}

export async function fetchDepartments() {
  const response = await axios.get(`${VITE_SERVER_URL}/api/departments`);
  let departments;

  if (response.status === 200) {
    departments = response.data.data;
  }

  return departments;
}

export async function fetchAnnouncements() {
  const response = await axios.get(`${VITE_SERVER_URL}/api/announcements`);
  let announcements;

  if (response.status === 200) {
    announcements = response.data.data;
  }

  return announcements;
}

export async function fetchAnnouncement(id) {
  const response = await axios.get(
    `${VITE_SERVER_URL}/api/announcements/${id}`,
  );
  let announcement;

  if (response.status === 200) {
    announcement = response.data.data;
  }

  return announcement;
}

export async function fetchUser() {
  const employeeNumber = localStorage.getItem('EmployeeNumber') || 100; // 임시
  const response = await fetch(
    `${VITE_SERVER_URL}/api/user?employeeNumber=${employeeNumber}`,
  );
  let user;

  if (response.status === 200) {
    user = await response.json();
  }

  return user.data;
}
