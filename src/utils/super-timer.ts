export const displayTimeLeft = (timeInSeconds: number) => {
  if (timeInSeconds <= 60) {
    return `${timeInSeconds}sec`;
  }
  let timeInMinutes = Math.floor(timeInSeconds / 60);
  return `${timeInMinutes}min`;
};

export const convertMinutesToSeconds = (timeInMinutes: number) =>
  timeInMinutes * 60;
