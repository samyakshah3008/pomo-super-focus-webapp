import { get } from "@/config/API";
import { getWorkingFrameworkTemplatesEndpoint } from "@/constants/APIEndpoints";

const fetchTemplatesService = async () => {
  const response = await get(getWorkingFrameworkTemplatesEndpoint);
  return response;
};

export { fetchTemplatesService };
