'use client';

import * as React from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { jabatanColumns } from '@/features/admin/jabatan/columns';
import { Loading } from '@/features/admin/Loading';
import { JabatanFormModal } from '@/features/admin/jabatan/JabatanFormModal';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import { useCrudModal } from '@/features/admin/useCrudModal';
import { useJabatan } from '@/features/admin/jabatan/hooks/useJabatan';
import { CrudJabatan } from '@/lib/btw/interfaces/btw';

export default function JabatanPage() {
  const { data, setData, isLoading } = useJabatan();
  const crud = useCrudModal<CrudJabatan>();

  /* ===== SAVE ===== */
  const handleSave = async (payload: { nama_jabatan: string }) => {
    try {
      if (crud.isEdit && crud.activeItem) {
        const updated = await saveDataToAPI(
          'jabatan',
          payload,
          crud.activeItem.id,
        );
        setData(data.map((d) => (d.id === updated.id ? updated : d)));
      } else {
        const created = await saveDataToAPI('jabatan', payload);
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
      await deleteDataFromAPI('jabatan', crud.activeItem.id!);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
    } finally {
      crud.close();
    }
  };

  return (
    <>
      <HeaderSection
        page="Jabatan"
        title="Jabatan"
        handleTambah={crud.openCreate}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={jabatanColumns({
            onEdit: crud.openEdit,
            onDelete: crud.openDelete,
          })}
        />
      )}

      {/* FORM MODAL */}
      <JabatanFormModal
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
        description={`Yakin hapus jabatan ID ${crud.activeItem?.id}?`}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
