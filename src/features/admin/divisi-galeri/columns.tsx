import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { CrudDivisiGaleri } from '@/lib/btw/interfaces/btw';

interface ColumnActions {
  onEdit: (row: CrudDivisiGaleri) => void;
  onDelete: (row: CrudDivisiGaleri) => void;
}

export function divisiGaleriColumns(
  actions: ColumnActions,
): ColumnDef<CrudDivisiGaleri>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'foto_divisi',
      header: 'Foto Divisi',
      cell: ({ row }) => {
        const foto = row.original.foto_divisi;
        return foto ? (
          <div className="h-16 w-24 overflow-hidden rounded-lg border">
            <Image
              src={foto}
              alt="Foto Divisi"
              width={96}
              height={64}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-gray-200">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'divisi_nama',
      header: 'Divisi',
    },
    {
      accessorKey: 'kepengurusan_nama',
      header: 'Kepengurusan',
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
              className="h-10 w-10 p-0 hover:bg-blue-500/10"
              onClick={() => actions.onEdit(data)}
            >
              <Edit className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 hover:bg-red-500/10"
              onClick={() => actions.onDelete(data)}
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
}
