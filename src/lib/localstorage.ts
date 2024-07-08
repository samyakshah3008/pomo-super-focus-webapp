import { setCookie } from "cookies-next";

export const isLocalStorageAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem("test", "test");
    window.localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
};

export const getLocalStorageItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) return null;
  return window.localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  if (!isLocalStorageAvailable()) return;
  window.localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string): void => {
  if (!isLocalStorageAvailable()) return;
  window.localStorage.removeItem(key);
};

export const saveAccessAndRefreshToken = (
  accessToken: string,
  refreshToken: string
): void => {
  setLocalStorageItem("accessToken", accessToken);
  setLocalStorageItem("refreshToken", refreshToken);
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};
