function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes / 60;
}

function getWorkDuration({ startTime, endTime }) {
  const MAX = 9;
  const startMinutes = startTime ? getTimeInMinutes(startTime) : 0;
  const endMinutes = endTime ? getTimeInMinutes(endTime) : 0;
  const durationHours =
    endMinutes - startMinutes < 0
      ? 0
      : Math.floor((endMinutes - startMinutes) / 60);
  return durationHours >= MAX ? 8 : durationHours;
}

function calculateWeeklyWorkHours(data) {
  return data.reduce((total, current) => total + getWorkDuration(current), 0);
}

function setTodayWork(today) {
  return {
    date: today,
    startTime: null,
    endTime: null,
    status: null,
  };
}

// 누적 근무 시간 관리 함수
function calculateDailyWorkDuration(attendance) {
  if (!attendance.startTime || !attendance.endTime) {
    return 0;
  }

  const startTime = attendance.startTime.split(':');
  const endTime = attendance.endTime.split(':');

  const startHour = parseInt(startTime[0], 10);
  const startMinute = parseInt(startTime[1], 10);
  const endHour = parseInt(endTime[0], 10);
  const endMinute = parseInt(endTime[1], 10);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const durationHours = durationMinutes / 60;

  return durationHours - 1;
}

function getDayOfWeek(dateStr) {
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

function calculateWeeklyCumulativeHours(attendances) {
  attendances.sort((a, b) => new Date(a.date) - new Date(b.date));

  const weeklyCumulativeHours = [];
  let cumulativeHours = 0;

  attendances.forEach((attendance, index) => {
    const date = new Date(attendance.date);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 1 && index !== 0) {
      cumulativeHours = 0;
    }

    const dailyHours = calculateDailyWorkDuration(attendance);
    cumulativeHours += dailyHours;

    weeklyCumulativeHours.push({
      date: attendance.date,
      cumulativeHours: Math.round(cumulativeHours * 10) / 10,
    });
  });

  return weeklyCumulativeHours;
}

export {
  calculateWeeklyWorkHours,
  setTodayWork,
  calculateDailyWorkDuration,
  getDayOfWeek,
  calculateWeeklyCumulativeHours,
};
