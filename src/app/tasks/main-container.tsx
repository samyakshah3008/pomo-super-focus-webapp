"use client";

import CreateTaskSidesheet from "@/components/(tasks)/create-task-sidesheet";
import { DataTable } from "@/components/(tasks)/data-table";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchTasksListService } from "@/services/tasks/tasks";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundItem from "../../../public/empty-state-box.png";
import {
  p1PriorityKey,
  p2PriorityKey,
  p3PriorityKey,
  p4PriorityKey,
} from "./constants";
import EisenhowerMatrix from "./eisen-hower-matrix";

const MainContainer = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);
  const [eisenMatrixData, setEisenMatrixData] = useState<any>(null);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const { toast } = useToast();
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const prepareEisenMatrixData = (taskItems: any) => {
    let findP1Priority = taskItems?.filter(
      (item: any) => item?.priority == p1PriorityKey && !item?.isCompleted
    );
    let findP2Priority = taskItems?.filter(
      (item: any) => item?.priority == p2PriorityKey && !item?.isCompleted
    );
    let findP3Priority = taskItems?.filter(
      (item: any) => item?.priority == p3PriorityKey && !item?.isCompleted
    );
    let findP4Priority = taskItems?.filter(
      (item: any) => item?.priority == p4PriorityKey && !item?.isCompleted
    );

    let eisenMatrixDataObj = {
      importantUrgent: findP1Priority,
      importantNotUrgent: findP3Priority,
      notImportantUrgent: findP2Priority,
      notImportantNotUrgent: findP4Priority,
    };

    setEisenMatrixData(eisenMatrixDataObj);
  };

  const fetchTaskItems = async () => {
    try {
      const response = await fetchTasksListService();
      let taskItems = response?.data?.data?.taskItems;
      prepareEisenMatrixData(taskItems);
      let reversedTaskItems = [...taskItems].reverse();
      setTasks(reversedTaskItems || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsFetchingTasks(false);
    }
    // if (currentUser?.isGuestUser) {
    //   setTasks(guestUserTasksItems);
    //   prepareEisenMatrixData(guestUserTasksItems);
    // } else {
    //   try {
    //     const response = await fetchTasksListService();
    //     let taskItems = response?.data?.data?.taskItems;
    //     prepareEisenMatrixData(taskItems);
    //     let reversedTaskItems = [...taskItems].reverse();
    //     setTasks(reversedTaskItems || []);
    //   } catch (error: any) {
    //     toast({
    //       variant: "destructive",
    //       title: "Oops, failed to fetch your task list! ⚠️",
    //       description:
    //         "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
    //     });
    //   } finally {
    //     setIsFetchingTasks(false);
    //   }
    // }
  };

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
    fetchTaskItems();
  }, [currentUser]);

  if (isFetchingTasks) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="w-[90%]">
        <EisenhowerMatrix
          eisenMatrixData={eisenMatrixData}
          fetchTaskItems={fetchTaskItems}
          // isGuestUser={isGuestUser}
          isGuestUser={false}
        />
        {!tasks?.length ? (
          <div className="h-96 flex flex-col gap-2 justify-center items-center">
            <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
            <h1 className="text-2xl font-bold ">
              Create your first task today!
            </h1>
            <p className="text-gray-600">
              Seems like you haven't created a task so far, create one today
              with Eisenhower framework! 😻
            </p>
            <CreateTaskSidesheet
              // isGuestUser={isGuestUser}
              isGuestUser={false}
              fetchTaskItems={fetchTaskItems}
            >
              <Button size="sm">Add new todo! 🚀</Button>
            </CreateTaskSidesheet>
          </div>
        ) : (
          <DataTable
            // isGuestUser={isGuestUser}
            isGuestUser={false}
            data={tasks}
            fetchTaskItems={fetchTaskItems}
          />
        )}
      </div>
    </>
  );
};

export default MainContainer;
