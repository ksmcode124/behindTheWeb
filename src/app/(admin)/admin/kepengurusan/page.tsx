'use client';

import * as React from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { useKepengurusan } from '@/features/admin/kepengurusan/hooks/useKepengurusan';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { kepengurusanColumns } from '@/features/admin/kepengurusan/columns';
import { Loading } from '@/features/admin/Loading';
import { KepengurusanFormModal } from '@/features/admin/kepengurusan/KepengurusanFormModal';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import { CrudKepengurusan } from '@/lib/btw/interfaces/btw';
import { useCrudModal } from '@/features/admin/useCrudModal';

export default function KepengurusanPage() {
  const { data, setData, isLoading } = useKepengurusan();
  const crud = useCrudModal<CrudKepengurusan>();

  /* ===== SAVE ===== */
  const handleSave = async (payload: {
    tahun_kerja: string;
    nama_kepengurusan: string;
  }) => {
    try {
      if (crud.isEdit && crud.activeItem) {
        const updated = await saveDataToAPI(
          'kepengurusan',
          payload,
          crud.activeItem.id,
        );
        setData(data.map((d) => (d.id === updated.id ? updated : d)));
      } else {
        const created = await saveDataToAPI('kepengurusan', payload);
        setData([...data, created]);
      }
      crud.close();
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan data');
    }
  };

  /* ===== DELETE ===== */
  const handleConfirmDelete = async () => {
    if (!crud.activeItem) return;

    try {
      await deleteDataFromAPI('kepengurusan', crud.activeItem.id!);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
    } finally {
      crud.close();
    }
  };

  return (
    <>
      <HeaderSection
        page="Kepengurusan"
        title="Kepengurusan"
        handleTambah={crud.openCreate}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={kepengurusanColumns({
            onEdit: crud.openEdit,
            onDelete: crud.openDelete,
          })}
        />
      )}

      {/* FORM MODAL */}
      <KepengurusanFormModal
        open={crud.isCreate || crud.isEdit}
        onOpenChange={(v) => !v && crud.close()}
        initialData={crud.isEdit ? crud.activeItem : null}
        onSubmit={handleSave}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={crud.isDelete}
        onOpenChange={(v) => !v && crud.close()}
        description={`Yakin hapus data ID ${crud.activeItem?.id}?`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
