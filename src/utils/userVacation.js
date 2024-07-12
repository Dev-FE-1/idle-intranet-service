function listVacationDaysWithSuffix(totalVacationDays) {
  const vacationDays = [];

  for (let i = 1; i <= totalVacationDays; i += 1) {
    vacationDays.push(`${i}일`);
  }

  return vacationDays;
}

function calculateEndDate(startDate, leaveDays) {
  let start = new Date(startDate);

  start.setDate(start.getDate() + leaveDays - 1);

  let year = start.getFullYear();
  let month = String(start.getMonth() + 1).padStart(2, '0');
  let day = String(start.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export { listVacationDaysWithSuffix, calculateEndDate };
