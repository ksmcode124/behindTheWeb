'use client';

import { useKepengurusanTable } from './useKepengurusanTable';
import { KepengurusanToolbar } from './KepengurusanToolbar';
import { KepengurusanDataTable } from './KepengurusanDataTable';
import { KepengurusanPagination } from './KepengurusanPagination';
import { ColumnDef } from '@tanstack/react-table';

interface KepengurusanTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function KepengurusanTable<TData>({
  columns,
  data,
}: KepengurusanTableProps<TData>) {
  const state = useKepengurusanTable(data, columns);

  return (
    <div className="grid h-[80vh] grid-rows-[auto_1fr_auto] rounded-xl border">
      <KepengurusanToolbar {...state} />
      <KepengurusanDataTable
        table={state.table}
        rows={state.paginatedRows}
        columnsLength={columns.length}
      />
      <KepengurusanPagination
        pageSize={state.pageSize}
        setPageSize={state.setPageSize}
        currentPage={state.currentPage}
        setCurrentPage={state.setCurrentPage}
        start={state.start}
        end={state.end}
        total={state.sortedRows.length}
        totalPages={state.totalPages}
      />
    </div>
  );
}
