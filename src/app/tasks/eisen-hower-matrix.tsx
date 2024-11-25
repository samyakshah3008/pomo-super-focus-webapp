"use client";

import CreateTaskSidesheet from "@/components/(tasks)/create-task-sidesheet";
import ReusableDialog from "@/components/common/reusable-dialog";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import {
  deleteItemFromUserTaskListService,
  onChangePriorityService,
  onChangeStatusService,
} from "@/services/tasks/tasks";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { IconCalendar, IconCircle, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";
import {
  p1PriorityKey,
  p2PriorityKey,
  p3PriorityKey,
  p4PriorityKey,
} from "./constants";

const EisenhowerMatrix = ({
  eisenMatrixData,
  fetchTaskItems,
  isGuestUser,
}: any) => {
  const [isConfirmDeleteTaskDialogOpen, setIsConfirmDeleteTaskDialogOpen] =
    useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const onConfirmDelete = async () => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
      setIsConfirmDeleteTaskDialogOpen(false);
    } else {
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
    }
  };

  const onCloseConfirmDeleteTaskDialog = () => {
    setIsConfirmDeleteTaskDialogOpen(false);
  };

  const onChangeStatus = async (newStatus: boolean, obj: any) => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
    } else {
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
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    // Logic to update the task's new column based on `result.source.droppableId` and `result.destination.droppableId`
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const draggedTaskId = result.draggableId; // Get the ID of the dragged task

    if (sourceId == destinationId) return;
    let newPriority;
    switch (destinationId) {
      case "importantUrgent":
        newPriority = p1PriorityKey;
        break;
      case "importantNotUrgent":
        newPriority = p3PriorityKey;
        break;
      case "notImportantUrgent":
        newPriority = p2PriorityKey;
        break;
      case "notImportantNotUrgent":
        newPriority = p4PriorityKey;
        break;
      default:
        return;
    }

    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
    } else {
      // Call the update task priority service
      try {
        await onChangePriorityService(newPriority, draggedTaskId);
        toast({
          variant: "default",
          title: "Task priority updated successfully! ✅",
          description: "The task has been moved to a new priority category.",
        });
        fetchTaskItems(); // Refresh tasks after updating
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to update task priority! ⚠️",
          description: error.message,
        });
      }
    }
    // Update your state or database here based on the dragged task's new position
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lg:flex flex-col items-center p-6 hidden ">
          {/* Horizontal Labels */}
          <div className="flex justify-center gap-6 mb-4 w-full">
            <div className="w-1/2 text-center text-lg font-semibold">
              Urgent
            </div>
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
            <Droppable droppableId="importantUrgent">
              {(provided) => (
                <MatrixBox
                  tasks={eisenMatrixData?.importantUrgent}
                  color="bg-red-100 dark:bg-red-700"
                  fetchTaskItems={fetchTaskItems}
                  setIsConfirmDeleteTaskDialogOpen={
                    setIsConfirmDeleteTaskDialogOpen
                  }
                  setSelectedTaskObj={setSelectedTaskObj}
                  onChangeStatus={onChangeStatus}
                  provided={provided}
                  isGuestUser={isGuestUser}
                />
              )}
            </Droppable>

            {/* Important & Not Urgent */}
            <Droppable droppableId="importantNotUrgent">
              {(provided) => (
                <MatrixBox
                  tasks={eisenMatrixData?.importantNotUrgent}
                  color="bg-yellow-100 dark:bg-yellow-700"
                  fetchTaskItems={fetchTaskItems}
                  setIsConfirmDeleteTaskDialogOpen={
                    setIsConfirmDeleteTaskDialogOpen
                  }
                  setSelectedTaskObj={setSelectedTaskObj}
                  onChangeStatus={onChangeStatus}
                  provided={provided}
                  isGuestUser={isGuestUser}
                />
              )}
            </Droppable>

            {/* Not Important & Urgent */}
            <Droppable droppableId="notImportantUrgent">
              {(provided) => (
                <MatrixBox
                  tasks={eisenMatrixData?.notImportantUrgent}
                  color="bg-blue-100 dark:bg-blue-700"
                  fetchTaskItems={fetchTaskItems}
                  setIsConfirmDeleteTaskDialogOpen={
                    setIsConfirmDeleteTaskDialogOpen
                  }
                  setSelectedTaskObj={setSelectedTaskObj}
                  onChangeStatus={onChangeStatus}
                  provided={provided}
                  isGuestUser={isGuestUser}
                />
              )}
            </Droppable>

            {/* Not Important & Not Urgent */}
            <Droppable droppableId="notImportantNotUrgent">
              {(provided) => (
                <MatrixBox
                  tasks={eisenMatrixData?.notImportantNotUrgent}
                  color="bg-green-100 dark:bg-green-700"
                  fetchTaskItems={fetchTaskItems}
                  setIsConfirmDeleteTaskDialogOpen={
                    setIsConfirmDeleteTaskDialogOpen
                  }
                  setSelectedTaskObj={setSelectedTaskObj}
                  onChangeStatus={onChangeStatus}
                  provided={provided}
                  isGuestUser={isGuestUser}
                />
              )}
            </Droppable>

            {/* Horizontal and Vertical Lines */}
            <div className="absolute left-[50%] top-0 bottom-0 border-l-2 border-gray-400 flex items-center justify-center"></div>
            <div className="absolute top-[50%] left-0 right-0 border-t-2 border-gray-400 flex items-center justify-center"></div>
          </div>
        </div>
      </DragDropContext>
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
  provided,
  isGuestUser,
}: any) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className={`${color} border border-gray-300 dark:border-neutral-700 rounded-lg p-4 w-[450px] h-[20rem] md:h-[26rem] lg:h-[30rem] lg:w-[300px] xl:w-[450px] flex flex-col`}
    >
      <div className="overflow-y-auto mb-2 flex-1 rounded-lg">
        {tasks?.length > 0 ? (
          <ul className="space-y-2">
            {tasks?.map((task: any, index: any) => (
              <Draggable key={task?._id} draggableId={task?._id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 text-xs flex gap-4 justify-between items-center bg-gray-100 dark:bg-neutral-700 rounded cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IconCircle
                        onClick={() => onChangeStatus(true, task)}
                        className="cursor-pointer"
                        size={20}
                      />
                      <div className="flex flex-col gap-1">
                        <span>{task?.title}</span>
                        <span
                          className={`flex gap-1 text-xs ${
                            moment(task?.dueDate, "DD-MM-YYYY").isBefore(
                              moment(),
                              "day"
                            )
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          <IconCalendar size={15} />
                          {moment(task?.dueDate, "DD-MM-YYYY").format(
                            "Do MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </span>
                    <span className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedTaskObj(task);
                          setIsConfirmDeleteTaskDialogOpen(true);
                        }}
                        variant="outline"
                        size="icon"
                      >
                        <IconTrash size={15} />
                      </Button>
                    </span>
                  </li>
                )}
              </Draggable>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center">
            No pending tasks here!🎉
          </div>
        )}
      </div>
      <CreateTaskSidesheet
        fetchTaskItems={fetchTaskItems}
        isGuestUser={isGuestUser}
      >
        <Button size="sm">+ Add new task</Button>
      </CreateTaskSidesheet>
      {provided.placeholder}
    </div>
  );
};

export default EisenhowerMatrix;
