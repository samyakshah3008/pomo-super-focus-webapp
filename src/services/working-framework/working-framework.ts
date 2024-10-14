import { get, postWithToken } from "@/config/API";
import {
  deleteWorkingFrameworkTemplateEndpoint,
  getCustomFrameworkByIdEndpoint,
  getWorkingFrameworkTemplatesEndpoint,
} from "@/constants/APIEndpoints";

const fetchTemplatesService = async () => {
  const response = await get(getWorkingFrameworkTemplatesEndpoint);
  return response;
};

const fetchCustomFrameworkByIdService = async (
  userId: string,
  customFrameworkId: string
) => {
  const response = await get(
    `${getCustomFrameworkByIdEndpoint}?userId=${userId}&customFrameworkId=${customFrameworkId}`
  );
  return response;
};

const deleteCustomWorkingFrameworkService = async (
  frameworkId: string,
  userId: string
) => {
  const response = await postWithToken(
    `${deleteWorkingFrameworkTemplateEndpoint}?id=${frameworkId}&userId=${userId}`
  );
  return response;
};

export {
  deleteCustomWorkingFrameworkService,
  fetchCustomFrameworkByIdService,
  fetchTemplatesService,
};
