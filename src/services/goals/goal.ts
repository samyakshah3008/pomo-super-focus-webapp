import { get } from "@/config/API";
import { goalsCRUDEndpoint } from "@/constants/APIEndpoints";

const getGoalsService = async () => {
  const response = await get(goalsCRUDEndpoint);
};

export { getGoalsService };
