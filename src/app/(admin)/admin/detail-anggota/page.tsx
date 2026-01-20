'use client';

import * as React from 'react';
import { useDetailAnggota } from '@/features/admin/detail-anggota/hooks/useDetailAnggota';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { deleteDataFromAPI } from '@/lib/btw/api';
import { DetailAnggota } from '@/lib/btw/interfaces/btw';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { detailAnggotaColumns } from '@/features/admin/detail-anggota/columns';
import { Loading } from '@/features/admin/Loading';
import { useCrudModal } from '@/features/admin/useCrudModal';
import { useRouter } from 'next/navigation';

export default function DetailAnggotaAdminPage() {
  const { data, isLoading, setData } = useDetailAnggota();
  const crud = useCrudModal<DetailAnggota>();
  const router = useRouter();

  // redirect untuk tambah atau edit
  const handleAdd = () => router.push('/admin/detail-anggota/add');
  const handleEdit = (item: DetailAnggota) =>
    router.push(`/admin/detail-anggota/edit/${item.id}`);

  const handleConfirmDelete = async () => {
    if (!crud.activeItem) return;
    try {
      await deleteDataFromAPI('detail_anggota', crud.activeItem.id!);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data');
    } finally {
      crud.close();
    }
  };

  return (
    <>
      <HeaderSection page="Anggota" title="Anggota" handleTambah={handleAdd} />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={detailAnggotaColumns({
            onEdit: handleEdit,
            onDelete: crud.openDelete, // tetap modal untuk delete
          })}
        />
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        open={crud.isDelete}
        onOpenChange={(v) => !v && crud.close()}
        description={`Yakin hapus anggota ID ${crud.activeItem?.id}?`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
