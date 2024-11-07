import { deleteRequest, get, postWithToken, put } from "@/config/API";
import {
  onChangePriorityEndpoint,
  onChangeStatusEndpoint,
  taskListEndpoint,
} from "@/constants/APIEndpoints";

const fetchTasksListService = async () => {
  const response = await get(taskListEndpoint);
  return response;
};

const addNewItemToUserTaskListService = async (itemObj: any, date: any) => {
  const response = await postWithToken(taskListEndpoint, {
    taskItem: { ...itemObj, dueDate: date },
  });
  return response;
};

const updateItemToUserTaskListService = async (
  itemObj: any,
  formattedDate: string,
  itemId: string
) => {
  const response = await put(taskListEndpoint, {
    taskItem: { ...itemObj, dueDate: formattedDate },
    taskId: itemId,
  });
  return response;
};

const deleteItemFromUserTaskListService = async (itemId: string) => {
  const response = await deleteRequest(`${taskListEndpoint}?taskId=${itemId}`);
  return response;
};

const onChangeStatusService = async (newStatus: boolean, taskId: string) => {
  const response = await postWithToken(onChangeStatusEndpoint, {
    newStatus,
    taskId,
  });
  return response;
};

const onChangePriorityService = async (newPriority: string, taskId: string) => {
  const response = await postWithToken(onChangePriorityEndpoint, {
    newPriority,
    taskId,
  });
  return response;
};

export {
  addNewItemToUserTaskListService,
  deleteItemFromUserTaskListService,
  fetchTasksListService,
  onChangePriorityService,
  onChangeStatusService,
  updateItemToUserTaskListService,
};
