// DivisiGaleriPage.tsx
'use client';

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { KepengurusanTable } from '@/features/admin/KepengurusanTable';
import { divisiGaleriColumns } from '@/features/admin/divisi-galeri/columns';
import {
  CrudDivisi,
  CrudDivisiGaleri,
  CrudKepengurusan,
} from '@/lib/btw/interfaces/btw';
import { useUploadThing } from '@/lib/uploadthing';
import { fetchDataFromAPI, API_BASE } from '@/lib/btw/api';
import { DivisiGaleriFormModal } from '@/features/admin/divisi-galeri/DivisiGaleriFormModal';
import { Loading } from '@/features/admin/Loading';

export default function DivisiGaleriPage() {
  const EMPTY_FORM = useMemo(
    () => ({ divisi_id: '', kepengurusan_id: '' }),
    [],
  );
  const [data, setData] = useState<CrudDivisiGaleri[]>([]);
  const [divisiList, setDivisiList] = useState<CrudDivisi[]>([]);
  const [kepengurusanList, setKepengurusanList] = useState<CrudKepengurusan[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrudDivisiGaleri | null>(null);
  const [tempForm, setTempForm] = useState<any>(EMPTY_FORM);
  const [tempFoto, setTempFoto] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) setTempFoto(res[0].url);
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => setUploadProgress(progress),
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [divisiData, kepengurusanData, galeriData] = await Promise.all([
        fetchDataFromAPI('divisi'),
        fetchDataFromAPI('kepengurusan'),
        fetchDataFromAPI('divisi-galeri'),
      ]);

      const formattedData = Array.isArray(galeriData)
        ? galeriData.map((item: any) => ({
            id: item.id_fotoDiv,
            divisi_id: item.divisi?.id_divisi,
            kepengurusan_id: item.kepengurusan?.id_btw,
            foto_divisi: item.foto_divisi,
            divisi_nama: item.divisi?.nama_divisi || 'N/A',
            kepengurusan_nama: item.kepengurusan?.nama_kepengurusan || 'N/A',
          }))
        : [];

      setData(formattedData);
      setDivisiList(divisiData);
      setKepengurusanList(kepengurusanData);
    } catch (error) {
      console.error(error);
      alert('Gagal memuat data galeri');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempForm(EMPTY_FORM);
    setTempFoto('');
    setSelectedFile(null);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CrudDivisiGaleri) => {
    setEditingItem(item);
    setTempForm({
      divisi_id: item.divisi_id.toString(),
      kepengurusan_id: item.kepengurusan_id.toString(),
    });
    setTempFoto(item.foto_divisi || '');
    setSelectedFile(null);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTempForm(EMPTY_FORM);
    setTempFoto('');
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleSave = async () => {
    if (!tempForm.divisi_id || !tempForm.kepengurusan_id) {
      alert('Harap pilih Divisi dan Kepengurusan!');
      return;
    }

    setIsLoading(true);
    try {
      let fotoUrl = tempFoto;
      if (selectedFile) {
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult && uploadResult[0]) fotoUrl = uploadResult[0].url;
      }

      if (!fotoUrl) {
        alert('Foto Galeri Wajib Diupload!');
        setIsLoading(false);
        return;
      }

      const payload = {
        id_divisi: parseInt(tempForm.divisi_id),
        id_btw: parseInt(tempForm.kepengurusan_id),
        foto_divisi: fotoUrl,
      };

      const endpointUrl = `${API_BASE}/divisi-galeri`;
      let response;
      if (editingItem) {
        response = await fetch(`${endpointUrl}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(endpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'Gagal menyimpan data');

      const newItem = result.data;
      const normalizedItem = {
        id: newItem.id_fotoDiv,
        divisi_id: newItem.divisi?.id_divisi,
        kepengurusan_id: newItem.kepengurusan?.id_btw,
        foto_divisi: newItem.foto_divisi,
        divisi_nama: newItem.divisi?.nama_divisi,
        kepengurusan_nama: newItem.kepengurusan?.nama_kepengurusan,
      };

      if (editingItem) {
        setData(
          data.map((d) => (d.id === editingItem.id ? normalizedItem : d)),
        );
      } else {
        setData([...data, normalizedItem]);
      }

      handleCloseModal();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: CrudDivisiGaleri) => {
    if (!confirm('Yakin ingin menghapus foto galeri ini?')) return;
    try {
      const response = await fetch(`${API_BASE}/divisi-galeri/${item.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Gagal menghapus data');
      setData(data.filter((d) => d.id !== item.id));
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
        handleTambah={handleAddNew}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <KepengurusanTable
          data={data}
          columns={divisiGaleriColumns({
            onEdit: handleEdit,
            onDelete: handleDelete,
          })}
        />
      )}

      <DivisiGaleriFormModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        initialData={editingItem}
        divisiList={divisiList}
        kepengurusanList={kepengurusanList}
        onSubmit={handleSave}
      />
    </>
  );
}
