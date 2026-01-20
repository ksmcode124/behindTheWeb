'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { saveDataToAPI, fetchDataFromAPI } from '@/lib/btw/api';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import {
  DetailAnggota,
  CrudAnggota,
  CrudDivisi,
  CrudJabatan,
  CrudKepengurusan,
} from '@/lib/btw/interfaces/btw';
import { HeaderSection } from '@/features/admin/HeaderSection';
import { useUploadThing } from '@/lib/uploadthing';
import { Loading } from '@/features/admin/Loading';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditAnggotaPage({ params }: Props) {
  const router = useRouter();
  const { id } = React.use(params);

  const [form, setForm] = React.useState<Partial<DetailAnggota>>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [tempFoto, setTempFoto] = React.useState<string>('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const [anggotaList, setAnggotaList] = React.useState<CrudAnggota[]>([]);
  const [kepengurusanList, setKepengurusanList] = React.useState<
    CrudKepengurusan[]
  >([]);
  const [divisiList, setDivisiList] = React.useState<CrudDivisi[]>([]);
  const [jabatanList, setJabatanList] = React.useState<CrudJabatan[]>([]);

  // UploadThing hook
  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) setTempFoto(res[0].url);
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => setUploadProgress(progress),
  });

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [
          detailData,
          anggotaData,
          kepengurusanData,
          divisiData,
          jabatanData,
        ] = await Promise.all([
          fetchDataFromAPI('detail'),
          fetchDataFromAPI('anggota'),
          fetchDataFromAPI('kepengurusan'),
          fetchDataFromAPI('divisi'),
          fetchDataFromAPI('jabatan'),
        ]);

        const currentItem = detailData.find(
          (d: DetailAnggota) => d.id === parseInt(id),
        );
        if (!currentItem) throw new Error('Detail anggota tidak ditemukan');

        setForm(currentItem);
        setTempFoto(currentItem.foto_anggota || '');
        setAnggotaList(anggotaData);
        setKepengurusanList(kepengurusanData);
        setDivisiList(divisiData);
        setJabatanList(jabatanData);
      } catch (err) {
        console.error(err);
        alert('Gagal memuat data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    startUpload([file]); // otomatis upload ke server
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const saveData = {
        id_btw: form.kepengurusan_id,
        id_divisi: form.divisi_id,
        id_jabatan: form.jabatan_id,
      };
      await saveDataToAPI('detail', saveData, parseInt(id));
      router.push('/admin/detail-anggota');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <HeaderSection page="Edit Anggota" title="Edit Anggota" />

      {/* Form Wrapper */}
      <div className="grid h-[80vh] grid-cols-[1fr_1fr] grid-rows-[auto_1fr] gap-6 rounded-xl border bg-white p-6 shadow-lg">
        {/* Tombol Kembali */}
        <div className="col-span-2 row-start-1 flex justify-start">
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center space-x-2"
            onClick={() => router.back()}
          >
            ← <span>Kembali</span>
          </Button>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="col-span-2">
            <Loading />
          </div>
        ) : (
          <>
            {/* Kiri: Foto + Nama */}
            <div className="col-start-1 row-start-2 flex flex-col items-center space-y-6">
              {/* Nama Lengkap */}
              <div className="w-full max-w-xl">
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
                  Nama Lengkap
                </label>
                <h2 className="text-2xl font-bold text-gray-800">
                  {form.anggota_nama}
                </h2>
              </div>

              {/* Upload Foto */}
              <div className="w-full max-w-xl">
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
                  Upload Foto
                </label>
                <div
                  className={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-all ${
                    isUploading
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-400 bg-gray-50'
                  }`}
                  onClick={() => document.getElementById('foto-input')?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {tempFoto ? (
                    <Image
                      src={tempFoto}
                      alt="Preview Foto"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-400">
                      <Upload className="mb-2 h-8 w-8" />
                      {isUploading ? (
                        <p className="text-sm">
                          Uploading... {uploadProgress}%
                        </p>
                      ) : (
                        <p className="text-sm">Klik atau drag file ke sini</p>
                      )}
                    </div>
                  )}

                  {tempFoto && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25 opacity-0 transition-opacity hover:opacity-100">
                      <p className="text-sm text-white">
                        {isUploading
                          ? `Uploading ${uploadProgress}%`
                          : 'Klik untuk ganti foto'}
                      </p>
                    </div>
                  )}

                  <input
                    id="foto-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
                {selectedFile && (
                  <p className="mt-1 text-center text-sm text-gray-600">
                    {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Kanan: Dropdown + Submit */}
            <div className="col-start-2 row-start-2 flex flex-col space-y-10 p-10">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
                  Kepengurusan
                </label>
                <select
                  value={form.kepengurusan_id ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      kepengurusan_id: parseInt(e.target.value),
                    })
                  }
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

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
                  Divisi
                </label>
                <select
                  value={form.divisi_id ?? ''}
                  onChange={(e) =>
                    setForm({ ...form, divisi_id: parseInt(e.target.value) })
                  }
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

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
                  Jabatan
                </label>
                <select
                  value={form.jabatan_id ?? ''}
                  onChange={(e) =>
                    setForm({ ...form, jabatan_id: parseInt(e.target.value) })
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">Pilih Jabatan</option>
                  {jabatanList.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.nama_jabatan}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading || isUploading}
              >
                {isLoading || isUploading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
