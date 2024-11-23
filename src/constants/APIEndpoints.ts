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

// daily progress

export const dailyProgressEndpoint = "/users/daily-progress";

// streaks
export const streakDetailsEndpoint = "/streaks/log-streak";
export const updateDailyFocusTimeGoalEndpoint = "/streaks/daily-goal";

// leaderboard

export const getWeeklyLeaderboardEndpoint = "/leaderboard/weekly";
export const getWeeklyUserLeaderboardEndpoint = "/leaderboard/weekly/user-rank";
// working framework

export const getWorkingFrameworkTemplatesEndpoint = "/working-framework";

// habits scorecard

export const getAllHabitsEndpoint = "/habits";
export const createNewHabitEndpoint = "/habits/create";
export const updateHabitEndpoint = "/habits/update";
export const getTodaysHabitsEndpoint = "/habits/today";
export const deleteHabitEndpoint = "/habits";
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

// update basic information endpoint:

export const updateBasicInformationEndpoint = "/users/update-basic-information";

// update email endpoint:

export const updateEmailEndpoint = "/users/update-email";
export const verifyOTPAndUpdateEmailEndpoint = "/users/update-email/verify";

// tasks endpoints:

export const taskListEndpoint = "/tasks";
export const onChangeStatusEndpoint = "/tasks/change-status";
export const onChangePriorityEndpoint = "/tasks/change-priority";

// self review endpoints:

export const selfReviewListEndpoint = "/self-review";

// super focus endpoints

export const fetchSuperFocusDetailsEndpoint = "/super-focus";
export const updateSuperFocusSettingsEndpoint = "/super-focus/update-settings";
export const addPomodoroEndpoint = "/super-focus/add-pomodoro";
export const fetchActivePomodoroDetailsEndpoint =
  "/super-focus/active-pomodoro";
export const initializeActivePomodoroSessionEndpoint =
  "/super-focus/initialize-active-pomodoro";
export const activePomodoroSessionEndpoint = "/super-focus/active-pomodoro";
