// authentication - signin
export const sendOTPToSigningInUserEndpoint = "/users/signin";
export const verifyOTPToSigningInUserEndpoint = "/users/signin/verify-otp";

// authentication - signup
export const sendOTPToSigningUpUserEndpoint = "/users/signup";
export const verifyOTPTOSigningUpUserEndpoint = "/users/signup/verify-otp";

// authentication - guest signup
export const guestUserSignUpEndpoint = "/users/signup/guest";

// refresh access token

export const refreshAccessTokenEndpoint = "/users/refresh-access-token";
// user details endpoint

export const userDetailsEndpoint = "/users";

// goals CRUD
export const goalsCRUDEndpoint = "/users/goals";

// pomodoros

export const logPomodoroSessionEndpoint = "/pomodoros/log-session";
export const activePomodoroSessionEndpoint = "/pomodoros/active-pomodoro";

// daily progress

export const dailyProgressEndpoint = "/users/daily-progress";

// streaks
export const streakDetailsEndpoint = "/streaks/log-streak";
export const updateDailyFocusTimeGoalEndpoint = "/streaks/daily-goal";

// leaderboard

export const getWeeklyLeaderboardEndpoint = "/leaderboard/weekly";

// working framework

export const getWorkingFrameworkTemplatesEndpoint = "/working-framework";

// habits scorecard

export const getHabitsEndpoint = "/habits";
// user working framework endpoint

export const activateWorkingFrameworkEndpoint =
  "/users/activate-working-framework";

// custom working framework endpoint

export const customWorkingFrameworkTemplatesEndpoint =
  "/custom-working-framework";

export const deleteWorkingFrameworkTemplateEndpoint =
  "/custom-working-framework/delete";

export const getCustomFrameworkByIdEndpoint =
  "/custom-working-framework/get-framework-by-id";

export const updateCustomFrameworkByIdEndpoint =
  "/custom-working-framework/update";

// my life endpoints:

export const updateMyLifeDetailsEndpoint = "/users/my-life";

// bucket list endpoints:

export const bucketListEndpoint = "/bucket-list";

// goals list endpoints:

export const goalListEndpoint = "/goals";

// gratitude list endpoints:

export const gratitudeListEndpoint = "/gratitude";
