function listVacationDaysWithSuffix(totalVacationDays) {
  const vacationDays = [];

  for (let i = 1; i <= totalVacationDays; i += 1) {
    vacationDays.push(`${i}일`);
  }

  return vacationDays;
}

function calculateEndDate(startDate, leaveDays) {
  const start = new Date(startDate);

  start.setDate(start.getDate() + leaveDays - 1);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export { listVacationDaysWithSuffix, calculateEndDate };
