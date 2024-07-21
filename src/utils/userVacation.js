function listVacationDaysWithSuffix(totalVacationDays) {
  const vacationDays = [];

  for (let i = 1; i <= totalVacationDays; i += 1) {
    vacationDays.push(`${i}일`);
  }

  return vacationDays;
}

function calculateEndDate(startDate, leaveDays) {
  const start = new Date(startDate);
  let daysAdded = 0;

  while (daysAdded < leaveDays) {
    start.setDate(start.getDate() + 1);
    const dayOfWeek = start.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded += 1;
    }
  }

  start.setDate(start.getDate() - 1);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function adjustStartDate(date) {
  const validDate = date instanceof Date ? date : new Date(date);
  validDate.setHours(0, 0, 0, 0);

  const dayOfWeek = validDate.getDay();
  if (dayOfWeek === 6) {
    return new Date(validDate.setDate(validDate.getDate() + 2));
  }
  if (dayOfWeek === 0) {
    return new Date(validDate.setDate(validDate.getDate() + 1));
  }
  return validDate;
}

function formatDateToISO(date) {
  return date
    .toLocaleDateString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '');
}

function calculateEndTime(startTime, duration) {
  const [hour, minute] = startTime.split(':').map(Number); // Convert "HH:MM" to numbers
  const durationHours = parseInt(duration, 10); // Convert duration string "X시간" to integer X

  let endHour = hour + durationHours;
  const endMinute = minute;

  if (endHour >= 24) {
    endHour -= 24;
  }

  return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
}

export {
  listVacationDaysWithSuffix,
  calculateEndDate,
  adjustStartDate,
  formatDateToISO,
  calculateEndTime,
};
