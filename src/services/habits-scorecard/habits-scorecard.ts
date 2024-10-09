import { get } from "@/config/API";
import { getHabitsEndpoint } from "@/constants/APIEndpoints";

const fetchHabitsService = async (currentUser: any) => {
  const response = await get(
    `${getHabitsEndpoint}?userId=${currentUser?.pomoSuperUser?._id}`
  );
  return response;
};

export { fetchHabitsService };
