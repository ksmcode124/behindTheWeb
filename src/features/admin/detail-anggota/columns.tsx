'use client';

import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { DetailAnggota } from '@/lib/btw/interfaces/btw';

interface Props {
  onEdit: (item: DetailAnggota) => void;
  onDelete: (item: DetailAnggota) => void;
}

export const detailAnggotaColumns = ({ onEdit, onDelete }: Props) => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'anggota_nama',
    header: 'Nama Anggota',
  },
  {
    accessorKey: 'kepengurusan_nama',
    header: 'Kepengurusan',
  },
  {
    accessorKey: 'jabatan_nama',
    header: 'Jabatan',
  },
  {
    accessorKey: 'divisi_nama',
    header: 'Divisi',
  },
  {
    id: 'actions',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ row }: any) => {
      const data: DetailAnggota = row.original;
      return (
        <div className="flex justify-center gap-2">
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
