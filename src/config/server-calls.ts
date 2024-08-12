import {
  accessTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
  userKeyBrowserStorage,
} from "@/constants/browser-storage";
import { cookies } from "next/headers";

const cookieStore = cookies();

const getUserFromBrowserStorage = () => {
  const currentUser = cookieStore.get(userKeyBrowserStorage)?.value;
  const user = currentUser ? JSON.parse(currentUser) : null;
  return user ? user._id : null;
};

const getUserIdFromBrowserStorage = () => {
  const currentUserId = cookieStore.get(userIdKeyBrowserStorage)?.value;
  return currentUserId;
};

const fetchWithToken = async (url: string, options = {}) => {
  const accessToken = cookieStore.get(accessTokenKeyBrowserStorage)?.value;
  const defaultHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.response?.data || "An error occurred while fetching data"
    );
  }

  return response.json();
};

export { fetchWithToken, getUserIdFromBrowserStorage };
