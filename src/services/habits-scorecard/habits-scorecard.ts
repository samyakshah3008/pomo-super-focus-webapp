import { deleteRequest, get, postWithToken } from "@/config/API";
import {
  createNewHabitEndpoint,
  deleteHabitEndpoint,
  getAllHabitsEndpoint,
  getTodaysHabitsEndpoint,
  updateHabitEndpoint,
} from "@/constants/APIEndpoints";

const fetchAllHabitsService = async () => {
  const response = await get(getAllHabitsEndpoint);
  return response;
};

const fetchTodaysHabitsService = async () => {
  const response = await get(getTodaysHabitsEndpoint);
  return response;
};

const createHabitService = async (
  defineHabitText: any,
  getSpecificText: any,
  identityText: any,
  repeat: any,
  selectedDays: any
) => {
  const response = await postWithToken(createNewHabitEndpoint, {
    defineHabitText,
    getSpecificText,
    identityText,
    repeat,
    selectedDays,
  });
  return response;
};

const updateHabitService = async (
  habitId: any,
  defineHabitText: any,
  getSpecificText: any,
  identityText: any,
  repeat: any,
  selectedDays: any
) => {
  const response = await postWithToken(updateHabitEndpoint, {
    habitId,
    defineHabitText,
    getSpecificText,
    identityText,
    repeat,
    selectedDays,
  });
  return response;
};

const deleteHabitService = async (habitId: any) => {
  const response = await deleteRequest(deleteHabitEndpoint, { habitId });
  return response;
};

export {
  createHabitService,
  deleteHabitService,
  fetchAllHabitsService,
  fetchTodaysHabitsService,
  updateHabitService,
};
