// 한 번만 선언되도 좋은 상수들은 함수 외부로 빼서 선언해주는 것이 좋습니다.
// 그 이유는 함수 내부에서 선언된 상수는 함수가 호출될 때마다 새로 생성되기 때문입니다.

function getTimeInMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes / 60;
}

function getWorkDuration({ startTime, endTime }) {
  const MAX = 9;

  // 조건식을 줄일 수 있는 방법을 찾아보세요.
  const startMinutes = startTime ? getTimeInMinutes(startTime) : 0;
  const endMinutes = endTime ? getTimeInMinutes(endTime) : 0;
  const durationHours =
    endMinutes - startMinutes < 0
      ? 0
      : Math.floor((endMinutes - startMinutes) / 60);
  return Math.min(durationHours, 8);
}

function calculateWeeklyWorkHours(data) {
  return data.reduce((total, current) => total + getWorkDuration(current), 0);
}

function setTodayWork(date) {
  return {
    date,
    startTime: null,
    endTime: null,
    status: null,
  };
}

const parseTimeToHourAndMinute = (timeString) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return { hour, minute };
};

function extractTime(attendance) {
  const { startTime, endTime } = attendance;

  const { hour: startHour, minute: startMinute } =
    parseTimeToHourAndMinute(startTime);
  const { hour: endHour, minute: endMinute } =
    parseTimeToHourAndMinute(endTime);

  return { startHour, startMinute, endHour, endMinute };
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

  // 명령적으로 작성된 코드를 함수형으로 변경해보세요.
  // 굳이 새로운 배열과 let으로 재할당 할 필요 없습니다.
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

function calculateWeeklyCumulativeHours2(attendances) {
  return attendances
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce(
      (acc, cur, index) => {
        const date = new Date(cur.date);
        const dayOfWeek = date.getDay();

        if (dayOfWeek === 1 && index !== 0) {
          acc.cumulativeHours = 0;
        }

        const dailyHours = calculateDailyWorkDuration(cur);
        acc.cumulativeHours += dailyHours;

        acc.result.push({
          date: cur.date,
          cumulativeHours: Math.round(acc.cumulativeHours * 10) / 10,
        });

        return acc;
      },
      { result: [], cumulativeHours: 0 },
    ).result;
}

export {
  calculateWeeklyWorkHours,
  setTodayWork,
  calculateDailyWorkDuration,
  getDayOfWeek,
  calculateWeeklyCumulativeHours,
};
