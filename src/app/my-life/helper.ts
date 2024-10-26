import moment from "moment";

const calculateLifeLeft = (birthDate: string, lifeSpan: number) => {
  // Parse birth date
  const birth = moment(birthDate, "YYYY-MM-DD");

  // Calculate the end date (60 years from birthDate)
  const endOfLife = birth.clone().add(lifeSpan, "years");

  // Get today's date
  const now = moment();

  // Check if birth date is in the future
  if (birth.isAfter(now)) {
    return {
      isLifeSpanCompleted: true,
      totalWeeksLeft: 0,
      totalWeeksCompleted: 0,
      progressPercentage: 100,
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

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
    isLifeSpanCompleted: false,
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

const validateBirthDateAndEstimateTimeLeft = (
  birthDate: string,
  lifeSpan: any
) => {
  // Check if birthDate and lifeSpan are provided
  if (!birthDate || !lifeSpan) {
    return {
      validationPass: false,
      errorMessage: "Please provide both birth date and life span.",
    };
  }

  // Parse birth date
  const birth = moment(birthDate, "YYYY-MM-DD");
  if (!birth.isValid()) {
    return {
      validationPass: false,
      errorMessage:
        "Invalid birth date format. Please enter in YYYY-MM-DD format.",
    };
  }

  // Get today's date
  const now = moment();

  // Check if birth date is in the future
  if (birth.isAfter(now)) {
    return {
      validationPass: false,
      errorMessage:
        "Birth date cannot be in the future. Please enter a valid birth date.",
    };
  }

  // Check if lifeSpan is a positive number
  if (isNaN(lifeSpan) || lifeSpan <= 0) {
    return {
      validationPass: false,
      errorMessage: "Life span must be a positive number.",
    };
  }

  // Calculate the end date by adding lifeSpan years to birth date
  const endOfLife = birth.clone().add(lifeSpan, "years");

  // Check if the end of life is in the past
  if (endOfLife.isBefore(now)) {
    return {
      validationPass: false,
      errorMessage: `The estimated life span has already ended on ${endOfLife.format(
        "YYYY-MM-DD"
      )}. Please enter a valid life span.`,
    };
  }

  // If all validations pass
  return {
    validationPass: true,
    errorMessage: "",
  };
};

export { calculateLifeLeft, validateBirthDateAndEstimateTimeLeft };
