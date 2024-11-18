import { deleteRequest, get, postWithToken, put } from "@/config/API";
import { selfReviewListEndpoint } from "@/constants/APIEndpoints";

const fetchSelfReviewItemsService = async () => {
  const response = await get(selfReviewListEndpoint);
  return response;
};

const addNewItemToUserSelfReviewService = async (itemObj: any, date: any) => {
  const response = await postWithToken(selfReviewListEndpoint, {
    selfReviewItem: { ...itemObj, date },
  });
  return response;
};

const updateItemToUserSelfReviewService = async (
  itemObj: any,
  date: string,
  itemId: string
) => {
  const response = await put(selfReviewListEndpoint, {
    selfReviewItem: { ...itemObj, date },
    selfReviewItemId: itemId,
  });
  return response;
};

const deleteItemFromUserSelfReviewService = async (itemId: string) => {
  const response = await deleteRequest(
    `${selfReviewListEndpoint}?selfReviewItemId=${itemId}`
  );
  return response;
};

export {
  addNewItemToUserSelfReviewService,
  deleteItemFromUserSelfReviewService,
  fetchSelfReviewItemsService,
  updateItemToUserSelfReviewService,
};
