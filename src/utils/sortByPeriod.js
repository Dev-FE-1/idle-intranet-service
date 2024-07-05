export const sortByPeriod = (a, b) => {
  const getEndDate = (period) => {
    const endDateStr = period.split(' ~ ')[1];
    return endDateStr === '현재' ? new Date() : new Date(endDateStr);
  };

  const dateA = getEndDate(a.period);
  const dateB = getEndDate(b.period);

  return dateB - dateA;
};
