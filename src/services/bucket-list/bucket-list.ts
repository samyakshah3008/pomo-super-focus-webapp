import { deleteRequest, get, postWithToken, put } from "@/config/API";
import { bucketListEndpoint } from "@/constants/APIEndpoints";

const fetchBucketListService = async () => {
  const response = await get(bucketListEndpoint);
  return response;
};

const addNewItemToUserBucketService = async (itemObj: any) => {
  const response = await postWithToken(bucketListEndpoint, {
    bucketItem: itemObj,
  });
  return response;
};

const updateItemToUserBucketService = async (itemObj: any, itemId: string) => {
  const response = await put(bucketListEndpoint, {
    bucketItem: itemObj,
    bucketId: itemId,
  });
  return response;
};

const deleteItemFromUserBucketService = async (itemId: string) => {
  const response = await deleteRequest(
    `${bucketListEndpoint}?bucketId=${itemId}`
  );
  return response;
};

export {
  addNewItemToUserBucketService,
  deleteItemFromUserBucketService,
  fetchBucketListService,
  updateItemToUserBucketService,
};
