// authentication - signin
export const sendOTPToSigningInUserEndpoint = "/users/signin";
export const verifyOTPToSigningInUserEndpoint = "/users/signin/verify-otp";

// authentication - signup
export const sendOTPToSigningUpUserEndpoint = "/users/signup";
export const verifyOTPTOSigningUpUserEndpoint = "/users/signup/verify-otp";

// authentication - guest signup
export const guestUserSignUpEndpoint = "/users/signup/guest";

// goals CRUD
export const goalsCRUDEndpoint = "/users/goals";

// pomodoros

export const logPomodoroSessionEndpoint = "/pomodoros/log-session";
export const activePomodoroSessionEndpoint = "/pomodoros/active-pomodoro";

// daily progress

export const dailyProgressEndpoint = "/users/daily-progress";
export const streakDetailsEndpoint = "/streaks/log-streak";
