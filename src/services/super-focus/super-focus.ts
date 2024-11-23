import { deleteRequest, get, postWithToken } from "@/config/API";
import {
  activePomodoroSessionEndpoint,
  addPomodoroEndpoint,
  fetchActivePomodoroDetailsEndpoint,
  fetchSuperFocusDetailsEndpoint,
  initializeActivePomodoroSessionEndpoint,
} from "@/constants/APIEndpoints";

const fetchSuperFocusSettingsService = async () => {
  const response = await get(fetchSuperFocusDetailsEndpoint);
  return response;
};

const fetchActivePomodoroSession = async () => {
  const response = await get(fetchActivePomodoroDetailsEndpoint);
  return response;
};

const initializeActivePomodoroSessionService = async (studyTime: any) => {
  const response = await postWithToken(
    initializeActivePomodoroSessionEndpoint,
    { focusTimeInSeconds: studyTime }
  );
  return response;
};

const addNewPomodoroSessionService = async (studyFocusTime: any) => {
  const response = await postWithToken(addPomodoroEndpoint, {
    studyFocusTime,
  });
  return response;
};

const pausePomodoroSessionService = async (payload: {}) => {
  const response = await postWithToken(activePomodoroSessionEndpoint, payload);
  return response;
};

const resumePomodoroSessionService = async (payload: {}) => {
  const response = await postWithToken(activePomodoroSessionEndpoint, payload);
  return response;
};

const deletePomodoroSessionService = async () => {
  const response = await deleteRequest(activePomodoroSessionEndpoint);
  return response;
};

export {
  addNewPomodoroSessionService,
  deletePomodoroSessionService,
  fetchActivePomodoroSession,
  fetchSuperFocusSettingsService,
  initializeActivePomodoroSessionService,
  pausePomodoroSessionService,
  resumePomodoroSessionService,
};
