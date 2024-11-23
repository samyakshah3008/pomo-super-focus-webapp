"use client";

import CreateTaskSidesheet from "@/components/(tasks)/create-task-sidesheet";
import ReusableDialog from "@/components/common/reusable-dialog";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import {
  deleteItemFromUserTaskListService,
  onChangeStatusService,
} from "@/services/tasks/tasks";
import { IconCalendar, IconCircle, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";

const EisenhowerMatrix = ({ eisenMatrixData, fetchTaskItems }: any) => {
  const [isConfirmDeleteTaskDialogOpen, setIsConfirmDeleteTaskDialogOpen] =
    useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemFromUserTaskListService(selectedTaskObj?._id);
      toast({
        variant: "default",
        title: "Item deleted from your Task List ✅",
        description:
          "Yay! we have successfully deleted your item from your Task list!",
      });
      fetchTaskItems();
    } catch (error) {
      console.log(error, "error");
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from Task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsConfirmDeleteTaskDialogOpen(false);
      setIsDeleting(false);
    }
  };

  const onCloseConfirmDeleteTaskDialog = () => {
    setIsConfirmDeleteTaskDialogOpen(false);
  };

  const onChangeStatus = async (newStatus: boolean, obj: any) => {
    try {
      await onChangeStatusService(newStatus, obj?._id);
      toast({
        variant: "default",
        title: `Task status changed to ${
          newStatus == true ? "Completed 😻✅" : "Incomplete ❌⏳"
        }`,
        description: "Yay! we have successfully updated your task's status!",
      });
      fetchTaskItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to update your item from Task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-6">
        {/* Horizontal Labels */}
        <div className="flex justify-center gap-6 mb-4 w-full">
          <div className="w-1/2 text-center text-lg font-semibold">Urgent</div>
          <div className="w-1/2 text-center text-lg font-semibold">
            Not Urgent
          </div>
        </div>

        <div className="relative grid grid-cols-2 grid-rows-2 gap-6">
          {/* Vertical Labels */}
          <div className="absolute left-[-4rem] top-[20%] transform -rotate-90 text-lg font-semibold">
            Important
          </div>
          <div className="absolute left-[-5rem] bottom-[20%] transform -rotate-90 text-lg font-semibold">
            Not Important
          </div>

          {/* Important & Urgent */}
          <MatrixBox
            tasks={eisenMatrixData?.importantUrgent}
            color="bg-red-100 dark:bg-red-700"
            fetchTaskItems={fetchTaskItems}
            setIsConfirmDeleteTaskDialogOpen={setIsConfirmDeleteTaskDialogOpen}
            setSelectedTaskObj={setSelectedTaskObj}
            onChangeStatus={onChangeStatus}
          />

          {/* Important & Not Urgent */}
          <MatrixBox
            tasks={eisenMatrixData?.importantNotUrgent}
            color="bg-yellow-100 dark:bg-yellow-700"
            fetchTaskItems={fetchTaskItems}
            setIsConfirmDeleteTaskDialogOpen={setIsConfirmDeleteTaskDialogOpen}
            setSelectedTaskObj={setSelectedTaskObj}
            onChangeStatus={onChangeStatus}
          />

          {/* Not Important & Urgent */}
          <MatrixBox
            tasks={eisenMatrixData?.notImportantUrgent}
            color="bg-blue-100 dark:bg-blue-700"
            fetchTaskItems={fetchTaskItems}
            setIsConfirmDeleteTaskDialogOpen={setIsConfirmDeleteTaskDialogOpen}
            setSelectedTaskObj={setSelectedTaskObj}
            onChangeStatus={onChangeStatus}
          />

          {/* Not Important & Not Urgent */}
          <MatrixBox
            tasks={eisenMatrixData?.notImportantNotUrgent}
            color="bg-green-100 dark:bg-green-700"
            fetchTaskItems={fetchTaskItems}
            setIsConfirmDeleteTaskDialogOpen={setIsConfirmDeleteTaskDialogOpen}
            setSelectedTaskObj={setSelectedTaskObj}
            onChangeStatus={onChangeStatus}
          />

          {/* Horizontal and Vertical Lines */}
          <div className="absolute left-[50%] top-0 bottom-0 border-l-2 border-gray-400 flex items-center justify-center"></div>
          <div className="absolute top-[50%] left-0 right-0 border-t-2 border-gray-400 flex items-center justify-center"></div>
        </div>
      </div>
      <ReusableDialog
        isOpen={isConfirmDeleteTaskDialogOpen}
        onClose={onCloseConfirmDeleteTaskDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete this task. This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

// Reusable component for each matrix box
const MatrixBox = ({
  tasks,
  color,
  setIsConfirmDeleteTaskDialogOpen,
  setSelectedTaskObj,
  onChangeStatus,
  fetchTaskItems,
}: any) => {
  return (
    <div
      className={`${color} border border-gray-300 dark:border-neutral-700 rounded-lg p-4 w-[450px] h-[20rem] md:h-[26rem] lg:h-[30rem] flex flex-col`}
    >
      <div className="overflow-y-auto mb-2 flex-1">
        {tasks?.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task: any, index: any) => (
              <li
                key={index}
                className="p-4 text-sm flex justify-between items-center bg-gray-100 dark:bg-neutral-700 rounded cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  {" "}
                  <IconCircle
                    onClick={() => onChangeStatus(true, task)}
                    className="cursor-pointer"
                    size={20}
                  />{" "}
                  <div className="flex flex-col gap-1">
                    <span> {task?.title} </span>{" "}
                    <span
                      className={`flex gap-1 text-xs font-semibold ${
                        checkIsTaskOverDue(task)
                          ? "text-red-500 font-semibold"
                          : ""
                      } `}
                    >
                      <IconCalendar
                        size={14}
                        className={`${
                          checkIsTaskOverDue(task)
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      />{" "}
                      {task?.dueDate}
                    </span>
                  </div>
                </span>{" "}
                <IconTrash
                  onClick={() => {
                    setIsConfirmDeleteTaskDialogOpen(true);
                    setSelectedTaskObj(task);
                  }}
                  className="cursor-pointer"
                  size={20}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm text-gray-500">
            Yay! it's all empty!
          </div>
        )}
      </div>
      <CreateTaskSidesheet fetchTaskItems={fetchTaskItems} isGuestUser={true}>
        <Button size="sm">+ Add task</Button>
      </CreateTaskSidesheet>
    </div>
  );
};

const checkIsTaskOverDue = (task: any) => {
  return moment(task?.dueDate, "DD-MM-YYYY").isBefore(moment(), "day");
};

export default EisenhowerMatrix;
