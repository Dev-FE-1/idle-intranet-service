function getTimeInMinutes(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 60 + minutes + seconds / 60;
}

function getWorkDuration({ startTime, endTime }) {
  const MAX = 9;
  const startMinutes = getTimeInMinutes(startTime);
  const endMinutes = getTimeInMinutes(endTime);
  const durationHours = (endMinutes - startMinutes) / 60;

  return durationHours === MAX ? durationHours - 1 : durationHours;
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
