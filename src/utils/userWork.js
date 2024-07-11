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
  return durationHours > MAX ? 8 : durationHours;
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

export { calculateWeeklyWorkHours, setTodayWork };
