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
import { deleteHabitService } from "@/services/habits-scorecard/habits-scorecard";
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
import CreateHabitSidesheet from "./create-habit-sidesheet";
import UpdateHabitSidesheet from "./update-habit-sidesheet";
import ViewHabitSidesheet from "./view-habit-sidesheet";

export type HabitItem = {
  id: string;
  defineHabitText: string;
  getSpecificText: string;
  identityText: string;
  repeat: string;
  selectedDays: any;
};

export function DataTable({ data, fetchAllHabits, fetchTodayHabits }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openViewHabitSidesheet, setopenViewHabitSidesheet] = useState(false);
  const [openUpdateHabitSidesheet, setOpenUpdateHabitSidesheet] =
    useState(false);
  const [isConfirmDeleteItemDialogOpen, setIsConfirmDeleteItemDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItemObj, setSelectedItemObj] = useState<any>(null);
  const [repeat, setRepeat] = useState("");
  const [selectedDays, setSelectedDays] = useState<any>([]);

  const { toast } = useToast();

  const columns: ColumnDef<HabitItem>[] = [
    {
      accessorKey: "defineHabitText",
      header: "Habit",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-52">
          {row.getValue("defineHabitText")}
        </div>
      ),
    },
    {
      accessorKey: "getSpecificText",
      header: "Specific",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-96">
          {row.getValue("getSpecificText")}
        </div>
      ),
    },
    {
      accessorKey: "identityText",
      header: "Identity",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("identityText")}
        </div>
      ),
    },
    {
      accessorKey: "repeat",
      header: "Frequency",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("repeat")}
        </div>
      ),
    },
    {
      accessorKey: "selectedDays",
      header: "Days",
      cell: ({ row }: any) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("selectedDays")?.map((item: any) => {
            return <div className="uppercase">{item} </div>;
          })}
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
                  setopenViewHabitSidesheet(true);
                  setSelectedItemObj(row.original);
                  setRepeat(row.original.repeat);
                  setSelectedDays(row.original.selectedDays);
                }}
              >
                {" "}
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsConfirmDeleteItemDialogOpen(true);
                  setSelectedItemObj(row.original);
                  setRepeat(row.original.repeat);
                  setSelectedDays(row.original.selectedDays);
                }}
              >
                Delete
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItemObj(row.original);
                  setOpenUpdateHabitSidesheet(true);
                  setRepeat(row.original.repeat);
                  setSelectedDays(row.original.selectedDays);
                }}
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

  const onOpenChangeViewHabitSidesheet = () => {
    setopenViewHabitSidesheet(false);
  };

  const onOpenChangeUpdateHabitSidesheet: any = () => {
    setOpenUpdateHabitSidesheet(false);
  };

  const onCloseConfirmDeleteItemDialog = () => {
    setIsConfirmDeleteItemDialogOpen(false);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHabitService(selectedItemObj?._id);
      toast({
        variant: "default",
        title: "Item deleted from your Habit List ✅",
        description:
          "Yay! We have successfully deleted your item from your Habit list!",
      });
      fetchTodayHabits();
      fetchAllHabits();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from Habit list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience while we fix this!",
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteItemDialogOpen(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search habit..."
            value={
              (table
                .getColumn("defineHabitText")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("defineHabitText")
                ?.setFilterValue(event.target.value)
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
          <CreateHabitSidesheet
            fetchHabitsItems={fetchAllHabits}
            fetchTodayHabits={fetchTodayHabits}
          >
            <Button size="sm" className="ml-2">
              Create New Habit 🚀
            </Button>
          </CreateHabitSidesheet>
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

      <ViewHabitSidesheet
        habitObj={selectedItemObj}
        repeat={repeat}
        selectedDays={selectedDays}
        open={openViewHabitSidesheet}
        onOpenChangeViewHabitSidesheet={onOpenChangeViewHabitSidesheet}
      />
      <UpdateHabitSidesheet
        open={openUpdateHabitSidesheet}
        onOpenChange={onOpenChangeUpdateHabitSidesheet}
        fetchHabitsItems={fetchAllHabits}
        fetchTodayHabits={fetchTodayHabits}
        habitObj={selectedItemObj}
        setSelectedHabitObj={setSelectedItemObj}
        repeat={repeat}
        setRepeat={setRepeat}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <ReusableDialog
        isOpen={isConfirmDeleteItemDialogOpen}
        onClose={onCloseConfirmDeleteItemDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete this habit. This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
