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
