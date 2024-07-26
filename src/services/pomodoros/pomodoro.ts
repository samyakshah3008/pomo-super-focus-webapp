import { deleteRequest, get, patch, postWithToken } from "@/config/API";
import {
  activePomodoroSessionEndpoint,
  logPomodoroSessionEndpoint,
} from "@/constants/APIEndpoints";

const initiateActivePomodoroSessionService = async (payload: {}) => {
  const response = await postWithToken(activePomodoroSessionEndpoint, payload);
  return response;
};

const pausePomodoroSessionService = async (payload: {}) => {
  const response = await patch(activePomodoroSessionEndpoint, payload);
  return response;
};

const resumePomodoroSessionService = async (payload: {}) => {
  const response = await patch(activePomodoroSessionEndpoint, payload);
  return response;
};

const getActivePomodoroSessionService = async (queryParam: {}) => {
  const response = await get(activePomodoroSessionEndpoint, queryParam);
  return response;
};

const deleteActivePomodoroSessionService = async (queryParam: {}) => {
  const response = await deleteRequest(
    activePomodoroSessionEndpoint,
    queryParam
  );
  return response;
};

const saveCompletedPomodoroSessionService = async (payload: {}) => {
  const response = await postWithToken(logPomodoroSessionEndpoint, payload);
  return response;
};

export {
  deleteActivePomodoroSessionService,
  getActivePomodoroSessionService,
  initiateActivePomodoroSessionService,
  pausePomodoroSessionService,
  resumePomodoroSessionService,
  saveCompletedPomodoroSessionService,
};
