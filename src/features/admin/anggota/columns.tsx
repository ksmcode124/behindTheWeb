// anggota/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';
import { Button } from '@/components/ui/button';

type Props = {
  onView: (row: CrudAnggota) => void;
  onEdit: (row: CrudAnggota) => void;
  onDelete: (row: CrudAnggota) => void;
};

export const anggotaColumns = ({
  onView,
  onEdit,
  onDelete,
}: Props): ColumnDef<CrudAnggota>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'nama_anggota',
    header: 'Nama Anggota',
    cell: ({ row }) => (
      <button
        onClick={() => onView(row.original)}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Eye className="h-4 w-4" />
        {row.original.nama_anggota}
      </button>
    ),
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-center gap-2">
          <Button
            variant="ghost"
            className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-blue-500/10"
            onClick={() => onEdit(data)}
          >
            <Edit className="h-6 w-6 text-blue-600" />
          </Button>

          <Button
            variant="ghost"
            className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-red-500/10"
            onClick={() => onDelete(data)}
          >
            <Trash2 className="h-6 w-6 text-red-600" />
          </Button>
        </div>
      );
    },
  },
];
