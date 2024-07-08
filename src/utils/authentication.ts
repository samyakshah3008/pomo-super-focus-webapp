export const shallUserRedirectToSignin = (response: any) => {
  if (response?.data?.redirect && response?.data?.flow == "signup") {
    return true;
  } else {
    return false;
  }
};

export const shallUserRedirectToSignup = (response: any) => {
  if (response?.data?.redirect && response?.data?.flow == "signin") {
    return true;
  } else {
    return false;
  }
};
