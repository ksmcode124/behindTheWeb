import { Button } from '@/components/ui/button';
import { CrudDivisi } from '@/lib/btw/interfaces/btw';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

interface ColumnActions {
  onEdit: (row: CrudDivisi) => void;
  onDelete: (row: CrudDivisi) => void;
}

export function divisiColumns(actions: ColumnActions): ColumnDef<CrudDivisi>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'nama_divisi',
      header: 'Nama Divisi',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
    },
    {
      id: 'actions',
      header: 'Aksi',
      size: 30,
      enableResizing: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-blue-500/10"
              onClick={() => actions.onEdit(data)}
            >
              <Edit className="h-6 w-6 text-blue-600" />
            </Button>

            <Button
              variant="ghost"
              className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-red-500/10"
              onClick={() => actions.onDelete(data)}
            >
              <Trash2 className="h-6 w-6 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
}
