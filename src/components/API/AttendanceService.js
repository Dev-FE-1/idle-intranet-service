// 왜 컴포넌트 하위에 존재하는 건가요?
// fetch 사용과 axios의 차이점은 무엇인가요?

const { VITE_SERVER_URL } = import.meta.env;
const apiBaseUrl = VITE_SERVER_URL;

const addAttendance = async (attendanceData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/addAttendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add attendance data: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding attendance data:', error);
    throw error;
  }
};

const updateAttendance = async (attendanceData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/updateAttendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update attendance data: ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating attendance data:', error);
    throw error;
  }
};

export { addAttendance, updateAttendance };
