import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (v: string) => void;
}

export function KepengurusanToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: Props<TData>) {
  const sorting = table.getState().sorting;
  const activeSort = sorting[0]; // cuma 1 kolom

  return (
    <div className="bg-muted/40 flex items-center justify-between gap-6 border-b px-6 py-5">
      {/* SEARCH */}
      <Input
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="bg-muted h-12 max-w-md text-base"
      />

      <div className="flex w-80 gap-3 [&>*:last-child]:flex-1">
        {/* SORT BY COLUMN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 px-5">
              <ArrowUpDown />
              Sort by
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanSort())
              .map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() =>
                    table.setSorting([{ id: column.id, desc: false }])
                  }
                >
                  {String(column.columnDef.header)}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* SORT DIRECTION */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-11 px-5"
              disabled={!activeSort}
            >
              {activeSort?.desc ? 'Z–A' : 'A–Z'}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                activeSort && table.setSorting([{ ...activeSort, desc: false }])
              }
            >
              A – Z
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                activeSort && table.setSorting([{ ...activeSort, desc: true }])
              }
            >
              Z – A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
