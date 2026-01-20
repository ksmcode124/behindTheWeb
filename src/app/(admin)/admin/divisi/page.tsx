'use client';

import * as React from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { useDivisi } from '@/features/admin/divisi/hooks/useDivisi';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { divisiColumns } from '@/features/admin/divisi/columns';
import { Loading } from '@/features/admin/Loading';
import { DivisiFormModal } from '@/features/admin/divisi/DivisiFormModal';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import { CrudDivisi } from '@/lib/btw/interfaces/btw';
import { useCrudModal } from '@/features/admin/useCrudModal';

export default function DivisiPage() {
  const { data, setData, isLoading } = useDivisi();
  const crud = useCrudModal<CrudDivisi>();

  /* ===== SAVE ===== */
  const handleSave = async (payload: {
    nama_divisi: string;
    deskripsi: string;
  }) => {
    try {
      if (crud.isEdit && crud.activeItem) {
        const updated = await saveDataToAPI(
          'divisi',
          payload,
          crud.activeItem.id,
        );
        setData(data.map((d) => (d.id === updated.id ? updated : d)));
      } else {
        const created = await saveDataToAPI('divisi', payload);
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
      await deleteDataFromAPI('divisi', crud.activeItem.id!);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
    } finally {
      crud.close();
    }
  };

  return (
    <>
      <HeaderSection
        page="Divisi"
        title="Divisi"
        handleTambah={crud.openCreate}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={divisiColumns({
            onEdit: crud.openEdit,
            onDelete: crud.openDelete,
          })}
        />
      )}

      {/* FORM MODAL */}
      <DivisiFormModal
        open={crud.isCreate || crud.isEdit}
        onOpenChange={(v) => !v && crud.close()}
        initialData={crud.isEdit ? crud.activeItem : null}
        onSubmit={handleSave}
        loading={isLoading}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={crud.isDelete}
        onOpenChange={(v) => !v && crud.close()}
        description={`Yakin hapus divisi ID ${crud.activeItem?.id}?`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
