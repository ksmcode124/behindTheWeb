import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { CrudKepengurusan } from '@/lib/btw/interfaces/btw';

interface ColumnActions {
  onEdit: (row: CrudKepengurusan) => void;
  onDelete: (row: CrudKepengurusan) => void;
}

export const kepengurusanColumns = ({
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<CrudKepengurusan>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'tahun_kerja',
    header: 'Tahun Kerja',
  },
  {
    accessorKey: 'nama_kepengurusan',
    header: 'Nama Kepengurusan',
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="h-10 w-10 p-0"
            onClick={() => onEdit(data)}
          >
            <Edit className="h-5 w-5 text-blue-600" />
          </Button>

          <Button
            variant="ghost"
            className="h-10 w-10 p-0"
            onClick={() => onDelete(data)}
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </Button>
        </div>
      );
    },
  },
];
