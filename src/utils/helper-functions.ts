const getFormattedTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const getFormattedDate = (date: any) => date.toISOString().split("T")[0];

const getProgressPercentage = (totalHours: any, completedMinutes: any) => {
  const convertMinutes = totalHours * 60;
  const percentage = (completedMinutes * 100) / convertMinutes;
  return percentage;
};

export { getFormattedDate, getFormattedTodaysDate, getProgressPercentage };
