import {
  accessTokenKeyBrowserStorage,
  refreshTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
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

export const saveCredentialsToBrowserStorage = (
  accessToken: string,
  refreshToken: string,
  userId: any
): void => {
  setLocalStorageItem(accessTokenKeyBrowserStorage, accessToken);
  setLocalStorageItem(refreshTokenKeyBrowserStorage, refreshToken);
  setLocalStorageItem(userIdKeyBrowserStorage, userId);
  setCookie(accessTokenKeyBrowserStorage, accessToken, {
    maxAge: 60 * 60 * 24 * 365 * 10,
  });
  setCookie(refreshTokenKeyBrowserStorage, refreshToken, {
    maxAge: 60 * 60 * 24 * 365 * 10,
  });
  setCookie(userIdKeyBrowserStorage, userId, {
    maxAge: 60 * 60 * 24 * 365 * 10,
  });
};
