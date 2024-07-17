const getEndDate = (period) => {
  const [, endDateStr] = period.split(' ~ ');
  return endDateStr === '현재' ? new Date() : new Date(endDateStr);
};

export const sortByPeriod = (a, b) =>
  getEndDate(b.period) - getEndDate(a.period);
