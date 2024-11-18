const getTimeInMinutesAndSecondsFormat = (timeLeftInSeconds: any) => {
  let convertTimeToMinutes: any = Math.floor(timeLeftInSeconds / 60); // 59
  let remainingSeconds: any = timeLeftInSeconds - convertTimeToMinutes * 60;
  if (convertTimeToMinutes < 10) {
    convertTimeToMinutes = `0${convertTimeToMinutes}`;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }
  return `${convertTimeToMinutes}:${remainingSeconds}`;
};

export { getTimeInMinutesAndSecondsFormat };
