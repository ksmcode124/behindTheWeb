'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { saveDataToAPI, fetchDataFromAPI } from '@/lib/btw/api';
import { DetailAnggota } from '@/lib/btw/interfaces/btw';
import { Button } from '@/components/ui/button';

export default function AddEditDetailAnggotaPage({
  params,
}: {
  params: { id?: string };
}) {
  const router = useRouter();
  const [form, setForm] = React.useState<Partial<DetailAnggota>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const isEdit = !!params.id;

  React.useEffect(() => {
    if (isEdit) {
      fetchDataFromAPI('detail_anggota').then(setForm);
    }
  }, [params.id, isEdit]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await saveDataToAPI(
        'detail_anggota',
        form,
        // isEdit ? params.id : undefined,
      );
      router.back();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-bold">
        {isEdit ? 'Edit Detail Anggota' : 'Tambah Detail Anggota'}
      </h2>

      {/* FORM FIELD DISINI */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nama Anggota"
          value={form.anggota_nama ?? ''}
          onChange={(e) => setForm({ ...form, anggota_nama: e.target.value })}
          className="w-full rounded border p-2"
        />
        {/* Tambahkan dropdown untuk kepengurusan/divisi/jabatan */}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </div>
  );
}
