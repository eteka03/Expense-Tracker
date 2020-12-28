const formatDate = (date) => {
  const theD = new Date(date);
  let month = `${theD.getMonth() + 1}`;
  let day = `${theD.getDate() + 1}`;
  const year = theD.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export default formatDate;
