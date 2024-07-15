import { deleteRequest, get, postWithToken, put } from "@/config/API";
import { goalsCRUDEndpoint } from "@/constants/APIEndpoints";

const getGoalsService = async (payload: {}) => {
  const response = await get(goalsCRUDEndpoint, payload);
  return response;
};

const createGoalService = async (payload: {}) => {
  const response = await postWithToken(goalsCRUDEndpoint, payload);
  return response;
};

const updateGoalService = async (payload: {}) => {
  const response = await put(goalsCRUDEndpoint, payload);
  return response;
};

const deleteGoalService = async (payload: {}) => {
  const response = await deleteRequest(goalsCRUDEndpoint, payload);
  return response;
};

export {
  createGoalService,
  deleteGoalService,
  getGoalsService,
  updateGoalService,
};
