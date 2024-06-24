import axios from 'axios';

export async function fetchMembers() {
  const response = await axios.get('/api/members');
  let members;

  if (response.status === 200) {
    members = response.data.data;
  }

  return members;
}

export async function fetchAttendance() {
  const response = await axios.get('/api/attendance');
  let attendance;

  if (response.status === 200) {
    attendance = response.data.data;
  }

  return attendance;
}

export async function fetchVacationRequests() {
  const response = await axios.get('/api/vacationRequests');
  let vacationRequests;

  if (response.status === 200) {
    vacationRequests = response.data.data;
  }

  return vacationRequests;
}

export async function fetchDepartments() {
  const response = await axios.get('/api/departments');
  let departments;

  if (response.status === 200) {
    departments = response.data.data;
  }

  return departments;
}
