import { deleteRequest, get, postWithToken, put } from "@/config/API";
import { goalListEndpoint } from "@/constants/APIEndpoints";

const fetchGoalListService = async () => {
  const response = await get(goalListEndpoint);
  return response;
};

const addNewItemToUserGoalService = async (itemObj: any, date: any) => {
  const response = await postWithToken(goalListEndpoint, {
    goalItem: { ...itemObj, estimatedTimeToComplete: date },
  });
  return response;
};

const updateItemToUserGoalService = async (
  itemObj: any,
  formattedDate: string,
  itemId: string
) => {
  const response = await put(goalListEndpoint, {
    goalItem: { ...itemObj, estimatedTimeToComplete: formattedDate },
    goalId: itemId,
  });
  return response;
};

const deleteItemFromUserGoalService = async (itemId: string) => {
  const response = await deleteRequest(`${goalListEndpoint}?goalId=${itemId}`);
  return response;
};

export {
  addNewItemToUserGoalService,
  deleteItemFromUserGoalService,
  fetchGoalListService,
  updateItemToUserGoalService,
};
