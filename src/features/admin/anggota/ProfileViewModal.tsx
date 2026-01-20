// ViewProfileModal.tsx
import * as React from 'react';
import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';
import Link from 'next/link';
import { Edit, Trash2, UserCircle } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anggota?: CrudAnggota | null;
  onDelete: (anggota: CrudAnggota) => void;
  onEdit: (anggota: CrudAnggota) => void;
}

export function ProfileViewModal({
  open,
  onOpenChange,
  anggota,
  onDelete,
  onEdit,
}: Props) {
  if (!anggota) return null;

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title="Profil Anggota">
      <div className="grid grid-cols-2 gap-6">
        {/* Kiri: Foto Placeholder */}
        <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100">
          <UserCircle className="size-24" />
          <span className="max-w-[70%] text-center text-xs text-gray-500">
            Foto anggota dapat dilihat di detail anggota
          </span>
        </div>

        {/* Kanan: Detail */}
        <div className="flex flex-col justify-start space-y-3">
          <p className="text-2xl font-bold">{anggota.nama_anggota}</p>
          <p className="text-sm text-gray-500">ID: {anggota.id}</p>

          <div>
            <p>
              <strong>Linkedin </strong>
            </p>

            {anggota.linkedin ? (
              <Link
                href={anggota.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {anggota.linkedin}
              </Link>
            ) : (
              <p> Tidak Tersedia</p>
            )}
          </div>

          <div>
            <p>
              <strong>Instagram </strong>
            </p>

            {anggota.instagram ? (
              <Link
                href={anggota.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {anggota.instagram}
              </Link>
            ) : (
              <p>Tidak Tersedia</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-blue-500/10"
              onClick={() => {
                onEdit(anggota);
                onOpenChange(false);
              }}
            >
              <Edit className="h-6 w-6 text-blue-600" />
            </Button>

            <Button
              variant="ghost"
              className="h-11 w-11 p-0 transition-all hover:scale-110 hover:bg-red-500/10"
              onClick={() => {
                onDelete(anggota);
                onOpenChange(false);
              }}
            >
              <Trash2 className="h-6 w-6 text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
