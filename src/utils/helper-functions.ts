import moment from "moment";

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

const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};

const getDaysUntilYearEnd = (): number => {
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31); // December 31st of the current year
  const diffInTime = endOfYear.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  return diffInDays;
};

const getCurrentYear = (): number => {
  return new Date().getFullYear(); // Returns the current year
};

const getWeekTimeline = () => {
  const today = moment().startOf("day");
  const dayOfWeek = today.isoWeekday(); // ISO weekday: 1 (Monday) to 7 (Sunday)
  const startOfWeek = today.clone().subtract(dayOfWeek - 1, "days");
  const endOfWeek = startOfWeek.clone().add(6, "days");

  return {
    startOfWeek: startOfWeek.toDate(),
    endOfWeek: endOfWeek.toDate(),
  };
};

const convertMinutesToHour = (minutes: number) => {
  let convertedValue = Math.round(minutes / 60);
  return convertedValue;
};

export {
  convertMinutesToHour,
  getCurrentYear,
  getDaysUntilYearEnd,
  getFormattedDate,
  getFormattedTodaysDate,
  getProgressPercentage,
  getTimeOfDay,
  getWeekTimeline,
};
