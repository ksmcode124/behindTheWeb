'use client';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { anggotaColumns } from '@/features/admin/anggota/columns';
import { useAnggota } from '@/features/admin/anggota/hooks/useAnggota';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { DivisiFormModal } from '@/features/admin/divisi/DivisiFormModal';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { Loading } from '@/features/admin/Loading';
import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import React from 'react';

export default function Anggota() {
  const { data, isLoading, setIsLoading, setData } = useAnggota();

  return (
    <>
      <HeaderSection page="Angota" title="Anggota" />
      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable data={data} columns={anggotaColumns} />
      )}
    </>
  );
}
