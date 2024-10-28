import { deleteRequest, get, postWithToken, put } from "@/config/API";
import { gratitudeListEndpoint } from "@/constants/APIEndpoints";

const fetchGratitudeListService = async () => {
  const response = await get(gratitudeListEndpoint);
  return response;
};

const addNewItemToUserGratitudeService = async (itemObj: any) => {
  const response = await postWithToken(gratitudeListEndpoint, {
    gratitudeItem: itemObj,
  });
  return response;
};

const updateItemToUserGratitudeService = async (
  itemObj: any,
  itemId: string
) => {
  const response = await put(gratitudeListEndpoint, {
    gratitudeItem: itemObj,
    gratitudeId: itemId,
  });
  return response;
};

const deleteItemFromUserGratitudeService = async (itemId: string) => {
  const response = await deleteRequest(
    `${gratitudeListEndpoint}?gratitudeId=${itemId}`
  );
  return response;
};

export {
  addNewItemToUserGratitudeService,
  deleteItemFromUserGratitudeService,
  fetchGratitudeListService,
  updateItemToUserGratitudeService,
};
