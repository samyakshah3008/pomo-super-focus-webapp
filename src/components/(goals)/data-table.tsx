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
import { deleteItemFromUserGoalService } from "@/services/goals/goal";
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
import CreateGoalSidesheet from "./create-goal-sidesheet";
import UpdateGoalSidesheet from "./update-goal-sidesheet";
import ViewGoalSidesheet from "./view-goal-sidesheet";

export type Goal = {
  id: string;
  estimatedTimeToComplete: string;
  category: string;
  title: string;
  doAbleActions: string;
  status: "achieved" | "yet to achieve";
};

export function DataTable({ data, fetchGoalItems }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openViewGoalSidesheet, setOpenViewGoalSidesheet] = useState(false);
  const [openUpdateGoalSidesheet, setOpenUpdateGoalSidesheet] = useState(false);
  const [isConfirmDeleteGoalDialogOpen, setIsConfirmDeleteGoalDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedGoalObj, setSelectedGoalObj] = useState<any>(null);

  const { toast } = useToast();

  const columns: ColumnDef<Goal>[] = [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Goals",
      cell: ({ row }) => (
        <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "estimatedTimeToComplete",
      header: "Estimate time to achieve",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("estimatedTimeToComplete")}
        </div>
      ),
    },
    {
      accessorKey: "doAbleActions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("doAbleActions")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Achieved",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("status") == false ? "❌⏳" : "✅😻"}
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
                  setOpenViewGoalSidesheet(true);
                  setSelectedGoalObj(row.original);
                }}
              >
                {" "}
                View Goal
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsConfirmDeleteGoalDialogOpen(true);
                  setSelectedGoalObj(row.original);
                }}
              >
                Delete Goal
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedGoalObj(row.original);
                  setOpenUpdateGoalSidesheet(true);
                }}
              >
                Update Goal
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

  const onOpenChangeViewGoalSidesheet = () => {
    setOpenViewGoalSidesheet(false);
  };

  const onOpenChangeUpdateGoalSidesheet: any = () => {
    setOpenUpdateGoalSidesheet(false);
  };

  const onCloseConfirmDeleteGoalDialog = () => {
    setIsConfirmDeleteGoalDialogOpen(false);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemFromUserGoalService(selectedGoalObj?._id);
      toast({
        variant: "default",
        title: "Item deleted from your Goal List ✅",
        description:
          "Yay! we have successfully deleted your item from your goal list!",
      });
      fetchGoalItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from goal list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteGoalDialogOpen(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search goals..."
            value={(table.getColumn("goals")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("goals")?.setFilterValue(event.target.value)
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
          <CreateGoalSidesheet fetchGoalItems={fetchGoalItems}>
            <Button size="sm" className="ml-2">
              Create New Goal
            </Button>
          </CreateGoalSidesheet>
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
      <ViewGoalSidesheet
        open={openViewGoalSidesheet}
        onOpenChangeViewGoalSidesheet={onOpenChangeViewGoalSidesheet}
        goalObj={selectedGoalObj}
      />
      <UpdateGoalSidesheet
        open={openUpdateGoalSidesheet}
        onOpenChange={onOpenChangeUpdateGoalSidesheet}
        goalObj={selectedGoalObj}
        setSelectedGoalObj={setSelectedGoalObj}
        fetchGoalItems={fetchGoalItems}
      />
      <ReusableDialog
        isOpen={isConfirmDeleteGoalDialogOpen}
        onClose={onCloseConfirmDeleteGoalDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete this goal. This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
