'use client';

import * as React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import {
  CrudDivisi,
  CrudDivisiGaleri,
  CrudKepengurusan,
} from '@/lib/btw/interfaces/btw';
import { BaseModal } from '@/components/ui/base-modal';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CrudDivisiGaleri | null;
  divisiList: CrudDivisi[];
  kepengurusanList: CrudKepengurusan[];
  onSubmit: (data: {
    id?: number;
    foto_divisi: string;
    divisi_id: number;
    kepengurusan_id: number;
  }) => void;
}

export function DivisiGaleriFormModal({
  open,
  onOpenChange,
  initialData,
  divisiList,
  kepengurusanList,
  onSubmit,
}: Props) {
  const [foto, setFoto] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [divisiId, setDivisiId] = React.useState<number | undefined>();
  const [kepengurusanId, setKepengurusanId] = React.useState<
    number | undefined
  >();
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) setFoto(res[0].url);
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => setUploadProgress(progress),
  });

  // Reset state setiap kali modal dibuka
  React.useEffect(() => {
    if (open) {
      setFoto(initialData?.foto_divisi || '');
      setDivisiId(initialData?.divisi_id);
      setKepengurusanId(initialData?.kepengurusan_id);
      setSelectedFile(null);
      setUploadProgress(0);
    }
  }, [open, initialData]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      startUpload([file]);
    }
  };

  const handleSubmit = () => {
    if (!foto || !divisiId || !kepengurusanId) {
      alert('Semua field wajib diisi!');
      return;
    }

    onSubmit({
      id: initialData?.id, // <-- ini penting biar edit bisa
      foto_divisi: foto,
      divisi_id: divisiId,
      kepengurusan_id: kepengurusanId,
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData?.id ? 'Edit Galeri Divisi' : 'Tambah Galeri Divisi'}
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? `Uploading... ${uploadProgress}%` : 'Simpan'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Upload Foto */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
            Foto Galeri
          </label>
          <div
            className={`relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed ${
              isUploading
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-gray-50'
            }`}
            onClick={() => document.getElementById('foto-input')?.click()}
          >
            {foto ? (
              <Image
                src={foto}
                alt="Preview"
                fill
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Upload className="mb-1 h-6 w-6" />
                <span className="text-sm">
                  {isUploading
                    ? `Uploading ${uploadProgress}%`
                    : 'Klik untuk upload foto'}
                </span>
              </div>
            )}
            <input
              id="foto-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Divisi */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
            Divisi
          </label>
          <select
            value={divisiId ?? ''}
            onChange={(e) => setDivisiId(parseInt(e.target.value))}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Pilih Divisi</option>
            {divisiList.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama_divisi}
              </option>
            ))}
          </select>
        </div>

        {/* Kepengurusan */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
            Kepengurusan
          </label>
          <select
            value={kepengurusanId ?? ''}
            onChange={(e) => setKepengurusanId(parseInt(e.target.value))}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Pilih Kepengurusan</option>
            {kepengurusanList.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama_kepengurusan}
              </option>
            ))}
          </select>
        </div>
      </div>
    </BaseModal>
  );
}
