function listVacationDaysWithSuffix(totalVacationDays) {
  const vacationDays = [];

  for (let i = 1; i <= totalVacationDays; i += 1) {
    vacationDays.push(`${i}일`);
  }

  return vacationDays;
}

// 가급적 선언적으로 코드를 작성하는 것에 익숙해져보아요.
// Array.from 메서드로 for문을 추상화할 수 있습니다.
// 이렇게 코드를 작성하면, 코드의 의미를 명확하고 간결하게 전달할 수 있습니다.
// 해당 코드를 수행하는 것은 컴퓨터이지만, 실제로 읽는 것은 사람이기 때문에 읽기 쉽게 작성하는 것이 중요합니다.
const listVacationDaysWithSuffix2 = (totalVacationDays) =>
  Array.from({ length: totalVacationDays }, (_, i) => `${i + 1}일`);

function calculateEndDate(startDate, leaveDays) {
  const start = new Date(startDate);

  start.setDate(start.getDate() + leaveDays - 1);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0'); // 프로필이미지에서도 동일한 로직 사용됨.
  const day = String(start.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export { listVacationDaysWithSuffix, calculateEndDate };
