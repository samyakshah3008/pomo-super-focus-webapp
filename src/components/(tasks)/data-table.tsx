"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteItemFromUserTaskListService,
  onChangeStatusService,
} from "@/services/tasks/tasks";
import moment from "moment";
import ReusableDialog from "../common/reusable-dialog";
import { Button } from "../ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/primitives/dropdown-menu";
import { Input } from "../ui/primitives/input";
import { useToast } from "../ui/primitives/use-toast";
import CreateTaskSidesheet from "./create-task-sidesheet";
import UpdateTaskSidesheet from "./update-task-sidesheet";
import ViewTaskSidesheet from "./view-task-sidesheet";

export type Task = {
  id: string;
  dueDate: string;
  description: string;
  title: string;
  isCompleted: boolean;
  priority: string;
};

export function DataTable({ data, fetchTaskItems, isGuestUser }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openViewTaskSidesheet, setOpenViewTaskSidesheet] = useState(false);
  const [openUpdateTaskSidesheet, setOpenUpdateTaskSidesheet] = useState(false);
  const [isConfirmDeleteTaskDialogOpen, setIsConfirmDeleteTaskDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTaskObj, setSelectedTaskObj] = useState<any>(null);

  const { toast } = useToast();

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("priority")}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Actions",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Deadline",
      cell: ({ row }) => {
        const dueDate: any = row.getValue("dueDate");
        const isOverdue = moment(dueDate, "DD-MM-YYYY").isBefore(
          moment(),
          "day"
        );

        return (
          <div
            className={`lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40 ${
              isOverdue && !row.getValue("isCompleted")
                ? "text-red-500 font-semibold"
                : ""
            }`}
          >
            {dueDate}
          </div>
        );
      },
    },
    {
      accessorKey: "isCompleted",
      header: "Done?",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("isCompleted") == true ? "✅😻" : "❌⏳"}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>{" "}
              <DropdownMenuItem
                onClick={() => {
                  setOpenViewTaskSidesheet(true);
                  setSelectedTaskObj(row.original);
                }}
                disabled={isGuestUser}
              >
                {" "}
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTaskObj(row.original);
                  onChangeStatus(
                    row?.original?.isCompleted ? false : true,
                    row.original
                  );
                }}
                disabled={isGuestUser}
              >
                {" "}
                {row?.original?.isCompleted
                  ? "Mark as in-complete"
                  : "Mark as complete"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsConfirmDeleteTaskDialogOpen(true);
                  setSelectedTaskObj(row.original);
                }}
                disabled={isGuestUser}
              >
                Delete
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTaskObj(row.original);
                  setOpenUpdateTaskSidesheet(true);
                }}
                disabled={isGuestUser}
              >
                Update
              </DropdownMenuItem>{" "}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onOpenChangeViewTaskSidesheet = () => {
    setOpenViewTaskSidesheet(false);
  };

  const onOpenChangeUpdateTaskSidesheet: any = () => {
    setOpenUpdateTaskSidesheet(false);
  };

  const onCloseConfirmDeleteTaskDialog = () => {
    setIsConfirmDeleteTaskDialogOpen(false);
  };

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
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from Task list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteTaskDialogOpen(false);
    }
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
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateTaskSidesheet
            isGuestUser={isGuestUser}
            fetchTaskItems={fetchTaskItems}
          >
            <Button size="sm" className="ml-2">
              Create New Task
            </Button>
          </CreateTaskSidesheet>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <ViewTaskSidesheet
        open={openViewTaskSidesheet}
        onOpenChangeViewTaskSidesheet={onOpenChangeViewTaskSidesheet}
        taskObj={selectedTaskObj}
      />
      <UpdateTaskSidesheet
        open={openUpdateTaskSidesheet}
        onOpenChange={onOpenChangeUpdateTaskSidesheet}
        taskObj={selectedTaskObj}
        setSelectedTaskObj={setSelectedTaskObj}
        fetchTaskItems={fetchTaskItems}
      />
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
}
