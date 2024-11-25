import CreateGoalSidesheet from "@/components/(goals)/create-goal-sidesheet";
import { DataTable } from "@/components/(goals)/data-table";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchGoalListService } from "@/services/goals/goal";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundItem from "../../../public/empty-state-box.png";
import { goalsGuestUserData } from "./constants";

const MainContainer = () => {
  const [goalItems, setGoalItems] = useState<any>([]);
  const [fetchingGoalItems, setFetchingGoalItems] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const { toast } = useToast();

  const fetchGoalItems = async () => {
    try {
      const response = await fetchGoalListService();
      let goalItems = response?.data?.data?.goalItems;
      let reversedGoalItems = [...goalItems].reverse();
      setGoalItems(reversedGoalItems || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your goal list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setFetchingGoalItems(false);
    }
  };

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
      setGoalItems(goalsGuestUserData);
      setFetchingGoalItems(false);
    } else {
      setIsGuestUser(false);
      fetchGoalItems();
    }
  }, [currentUser]);

  if (fetchingGoalItems) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!goalItems?.length) {
    return (
      <div className="h-96 flex flex-col gap-2 justify-center items-center">
        <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
        <h1 className="text-2xl font-bold ">Fill your goal list today!</h1>
        <p className="text-gray-600">
          You haven't added any item to your goal list, add one today 😻
        </p>
        <CreateGoalSidesheet
          fetchGoalItems={fetchGoalItems}
          isGuestUser={isGuestUser}
        >
          <Button size="sm">Add new item to my goals! 🚀</Button>
        </CreateGoalSidesheet>
      </div>
    );
  }

  return (
    <>
      <div className="w-[80%]">
        <DataTable
          isGuestUser={isGuestUser}
          data={goalItems}
          fetchGoalItems={fetchGoalItems}
        />
      </div>
    </>
  );
};

export default MainContainer;
