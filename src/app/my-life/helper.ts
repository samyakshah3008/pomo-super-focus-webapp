import moment from "moment";

const calculateLifeLeft = (
  birthDate: string = "30-08-2003",
  lifeSpan: number = 60
) => {
  // Parse birth date
  const birth = moment(birthDate, "DD-MM-YYYY");

  // Calculate the end date (60 years from birthDate)
  const endOfLife = birth.clone().add(lifeSpan, "years");

  // Get today's date
  const now = moment();

  // Calculate the total duration left
  const durationLeft = moment.duration(endOfLife.diff(now));

  // Calculate total weeks left
  const totalWeeksLeft = Math.floor(durationLeft.asWeeks());

  const totalWeeksCompleted = Math.floor(
    moment.duration(now.diff(birth)).asWeeks()
  );

  // Extract remaining time into components
  const years = Math.floor(durationLeft.asYears());

  const totalWeeksInLifespan = lifeSpan * 52; // Approximate weeks in lifespan

  // Calculate lifespan progress percentage
  const progressPercentage = Number(
    ((totalWeeksCompleted / totalWeeksInLifespan) * 100).toFixed(2)
  );
  // Subtract the years from durationLeft to get the remaining months
  const months = Math.floor(durationLeft.asMonths() % 12);
  const days = Math.floor(durationLeft.asDays() % 30); // Approximate days
  const weeks = Math.floor((durationLeft.asDays() % 30) / 7); // Calculate weeks based on remaining days
  const hours = durationLeft.hours();
  const minutes = durationLeft.minutes();
  const seconds = durationLeft.seconds();

  return {
    totalWeeksLeft,
    totalWeeksCompleted,
    progressPercentage,
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
};

export { calculateLifeLeft };
