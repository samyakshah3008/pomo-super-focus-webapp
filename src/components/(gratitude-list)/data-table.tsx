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
import { deleteItemFromUserGratitudeService } from "@/services/gratitude-list/gratitude-list";
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
import CreateGratitudeSidesheet from "./create-gratitude-sidesheet";
import UpdateGratitudeItemSidesheet from "./update-gratitude-sidesheet";
import ViewGratitudeItemSidesheet from "./view-gratitude-sidesheet";

export type GratitudeItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export function DataTable({ data, fetchGratitudeItems, isGuestUser }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openViewGratitudeSidesheet, setopenViewGratitudeSidesheet] =
    useState(false);
  const [openUpdateGoalSidesheet, setOpenUpdateGoalSidesheet] = useState(false);
  const [isConfirmDeleteItemDialogOpen, setIsConfirmDeleteItemDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItemObj, setSelectedItemObj] = useState<any>(null);

  const { toast } = useToast();

  const columns: ColumnDef<GratitudeItem>[] = [
    {
      accessorKey: "title",
      header: "I'm grateful for,",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-52">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-96">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "dateOfCreation",
      header: "Date of creation",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("dateOfCreation")}
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
                  setopenViewGratitudeSidesheet(true);
                  setSelectedItemObj(row.original);
                }}
                disabled={isGuestUser}
              >
                {" "}
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsConfirmDeleteItemDialogOpen(true);
                  setSelectedItemObj(row.original);
                }}
                disabled={isGuestUser}
              >
                Delete
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItemObj(row.original);
                  setOpenUpdateGoalSidesheet(true);
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

  const onOpenChangeViewGoalSidesheet = () => {
    setopenViewGratitudeSidesheet(false);
  };

  const onOpenChangeUpdateGoalSidesheet: any = () => {
    setOpenUpdateGoalSidesheet(false);
  };

  const onCloseConfirmDeleteItemDialog = () => {
    setIsConfirmDeleteItemDialogOpen(false);
  };

  const onConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemFromUserGratitudeService(selectedItemObj?._id);
      toast({
        variant: "default",
        title: "Item deleted from your Gratitude List ✅",
        description:
          "Yay! We have successfully deleted your item from your gratitude list!",
      });
      fetchGratitudeItems();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, failed to delete your item from gratitude list! ⚠️",
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
            placeholder="Search gratitude..."
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
          <CreateGratitudeSidesheet
            fetchGratitudeItems={fetchGratitudeItems}
            isGuestUser={isGuestUser}
          >
            <Button size="sm" className="ml-2">
              Add New Gratitude 🙏
            </Button>
          </CreateGratitudeSidesheet>
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
      <ViewGratitudeItemSidesheet
        open={openViewGratitudeSidesheet}
        onOpenChangeViewItemSidesheet={onOpenChangeViewGoalSidesheet}
        itemObj={selectedItemObj}
      />
      <UpdateGratitudeItemSidesheet
        open={openUpdateGoalSidesheet}
        onOpenChange={onOpenChangeUpdateGoalSidesheet}
        itemObj={selectedItemObj}
        setItemObj={setSelectedItemObj}
        fetchGratitudeItems={fetchGratitudeItems}
      />
      <ReusableDialog
        isOpen={isConfirmDeleteItemDialogOpen}
        onClose={onCloseConfirmDeleteItemDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete this gratitude. This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
