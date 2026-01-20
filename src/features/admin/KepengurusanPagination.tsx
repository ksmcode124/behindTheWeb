import { Pagination } from '@/features/admin/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function KepengurusanPagination({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  start,
  end,
  total,
  totalPages,
}: any) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-2 text-sm">
        Rows per page
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            setPageSize(Number(v));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm">
          {total === 0 ? 0 : `${start + 1}-${Math.min(end, total)}`} of {total}
        </span>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
