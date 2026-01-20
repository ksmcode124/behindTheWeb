'use client';

import * as React from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { DivisiGaleriFormModal } from '@/features/admin/divisi-galeri/DivisiGaleriFormModal';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { ConfirmModal } from '@/components/ui/confirm-modal';
import { divisiGaleriColumns } from '@/features/admin/divisi-galeri/columns';
import { useCrudModal } from '@/features/admin/useCrudModal';

import { deleteDataFromAPI, saveDataToAPI } from '@/lib/btw/api';
import { CrudDivisiGaleri } from '@/lib/btw/interfaces/btw';
import { useDivisiGaleri } from '@/features/admin/divisi-galeri/hooks/useDivisiGaleri';
import { Loading } from '@/features/admin/Loading';

export default function DivisiGaleriPage() {
  const { data, setData, divisiList, kepengurusanList, isLoading } =
    useDivisiGaleri();
  const crud = useCrudModal<CrudDivisiGaleri>();

  /* ====== SAVE ====== */
  const handleSave = async (formData: {
    id?: number;
    foto_divisi: string;
    divisi_id: number;
    kepengurusan_id: number;
  }) => {
    try {
      const payload = {
        id_divisi: formData.divisi_id,
        id_btw: formData.kepengurusan_id,
        foto_divisi: formData.foto_divisi,
      };

      const result = await saveDataToAPI('divisi-galeri', payload, formData.id);

      const isArray = Array.isArray(result.data);
      const normalized: CrudDivisiGaleri = isArray
        ? result.data.map((item: any) => ({
            id: item.id_fotoDiv,
            foto_divisi: item.foto_divisi,
            divisi_id: item.divisi?.id_divisi,
            divisi_nama: item.divisi?.nama_divisi || 'N/A',
            kepengurusan_id: item.kepengurusan?.id_btw,
            kepengurusan_nama: item.kepengurusan?.nama_kepengurusan || 'N/A',
          }))[0] // ambil object pertama kalau edit, atau buat array handling lain
        : {
            id: result.data.id_fotoDiv,
            foto_divisi: result.data.foto_divisi,
            divisi_id: result.data.divisi?.id_divisi,
            divisi_nama: result.data.divisi?.nama_divisi || 'N/A',
            kepengurusan_id: result.data.kepengurusan?.id_btw,
            kepengurusan_nama:
              result.data.kepengurusan?.nama_kepengurusan || 'N/A',
          };

      if (formData.id) {
        setData(data.map((d) => (d.id === normalized.id ? normalized : d)));
      } else {
        setData([...data, normalized]);
      }

      crud.close();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Gagal menyimpan data');
    }
  };

  /* ====== DELETE ====== */
  const handleDelete = async () => {
    if (!crud.activeItem) return;
    try {
      await deleteDataFromAPI('divisi-galeri', crud.activeItem.id);
      setData(data.filter((d) => d.id !== crud.activeItem!.id));
      crud.close();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data.');
    }
  };

  return (
    <>
      <HeaderSection
        page="Divisi Galeri"
        title="Galeri Divisi"
        handleTambah={crud.openCreate}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={divisiGaleriColumns({
            onEdit: crud.openEdit,
            onDelete: crud.openDelete,
          })}
        />
      )}

      {/* FORM MODAL */}
      <DivisiGaleriFormModal
        open={crud.isCreate || crud.isEdit}
        onOpenChange={(v) => !v && crud.close()}
        initialData={crud.isEdit ? crud.activeItem : null}
        onSubmit={handleSave}
        divisiList={divisiList}
        kepengurusanList={kepengurusanList}
      />

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={crud.isDelete}
        onOpenChange={(v) => !v && crud.close()}
        description={`Yakin hapus galeri divisi ID ${crud.activeItem?.id}?`}
        onConfirm={handleDelete}
      />
    </>
  );
}
