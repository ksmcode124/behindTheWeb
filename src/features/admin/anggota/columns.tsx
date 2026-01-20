// anggota/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';
import { Button } from '@/components/ui/button';

type Props = {
  onView: (row: CrudAnggota) => void;
  onEdit: (row: CrudAnggota) => void;
  onDelete: (id: number) => void;
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
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => onEdit(row.original)}
          className="rounded-full p-2 text-blue-600 hover:bg-blue-100"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onDelete(row.original.id)}
          className="rounded-full p-2 text-red-600 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
