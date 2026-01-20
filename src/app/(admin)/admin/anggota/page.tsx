'use client';

import * as React from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { useAnggota } from '@/features/admin/anggota/hooks/useAnggota';
import { anggotaColumns } from '@/features/admin/anggota/columns';
import { Loading } from '@/features/admin/Loading';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';
import { useCrudModal } from '@/features/admin/useCrudModal';
import { ProfileViewModal } from '@/features/admin/anggota/ProfileViewModal'; // modal profile
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { AnggotaFormModal } from '@/features/admin/anggota/AnggotaFormModal';

export default function AnggotaPage() {
  const { data, setData, isLoading } = useAnggota();
  const crud = useCrudModal<CrudAnggota>();
  const profileModal = useCrudModal<CrudAnggota>(); // khusus modal view profile

  /* ===== DELETE ===== */
  const handleConfirmDelete = async () => {
    if (!crud.activeItem) return;

    try {
      await deleteDataFromAPI('anggota', crud.activeItem.id!);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
    } finally {
      crud.close();
    }
  };

  const handleViewProfile = (item: CrudAnggota) => profileModal.openEdit(item);

  const handleSave = async (payload: {
    nama_anggota: string;
    linkedin: string;
    instagram: string;
  }) => {
    try {
      if (crud.isEdit && crud.activeItem) {
        const updated = await saveDataToAPI(
          'anggota',
          payload,
          crud.activeItem.id,
        );
        setData(data.map((d) => (d.id === updated.id ? updated : d)));
      } else {
        const created = await saveDataToAPI('anggota', payload);
        setData([...data, created]);
      }
      crud.close();
    } catch (e) {
      console.error(e);
      alert('Gagal menyimpan data');
    }
  };

  return (
    <>
      <HeaderSection
        page="Anggota"
        title="Anggota"
        handleTambah={crud.openCreate}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={anggotaColumns({
            onEdit: crud.openEdit,
            onDelete: crud.openDelete,
            onView: handleViewProfile,
          })}
        />
      )}

      <AnggotaFormModal
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
        description={`Yakin hapus anggota ID ${crud.activeItem?.id}?`}
        onConfirm={handleConfirmDelete}
      />

      {/* VIEW PROFILE MODAL */}
      <ProfileViewModal
        open={profileModal.isOpen}
        onOpenChange={(v) => !v && profileModal.close()}
        anggota={profileModal.activeItem}
        onEdit={crud.openEdit}
        onDelete={crud.openDelete}
      />
    </>
  );
}
