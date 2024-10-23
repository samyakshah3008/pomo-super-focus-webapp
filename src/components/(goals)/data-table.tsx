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
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import CreateGoalSidesheet from "./create-goal-sidesheet";
import ViewGoalSidesheet from "./view-goal-sidesheet";

export type Goal = {
  id: string;
  time: string;
  category: string;
  goals: string;
  steps: string;
  status: "achieved" | "yet to achieve";
};

export function DataTable({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openViewGoalSidesheet, setOpenViewGoalSidesheet] =
    React.useState(false);

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
      accessorKey: "goals",
      header: "Goals",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("goals")}
        </div>
      ),
    },
    {
      accessorKey: "time",
      header: "Estimate time to achieve",
      cell: ({ row }) => (
        <div className="lowercase text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("time")}
        </div>
      ),
    },
    {
      accessorKey: "steps",
      header: "Actions",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("steps")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-40">
          {row.getValue("status")}
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
              <DropdownMenuItem onClick={() => setOpenViewGoalSidesheet(true)}>
                {" "}
                View Goal
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Goal</DropdownMenuItem>{" "}
              <DropdownMenuItem>Update Goal</DropdownMenuItem>{" "}
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
          <CreateGoalSidesheet>
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
      />
    </>
  );
}
