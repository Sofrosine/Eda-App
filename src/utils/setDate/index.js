export const setDate = (date, month, year) => {
  let newDate = date;
  let newMonth = month + 1;
  if (date.toString().length === 1) {
    newDate = `0${date}`;
  }
  if (month.toString().length === 1) {
    newMonth = `0${month + 1}`;
  }
  return `${year}-${newMonth}-${newDate}`;
};
