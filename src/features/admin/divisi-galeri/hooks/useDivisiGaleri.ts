'use client';

import { useState, useEffect } from 'react';
import { CrudDivisi, CrudDivisiGaleri, CrudKepengurusan } from '@/lib/btw/interfaces/btw';
import { fetchDataFromAPI } from '@/lib/btw/api';

export function useDivisiGaleri() {
  const [data, setData] = useState<CrudDivisiGaleri[]>([]);
  const [divisiList, setDivisiList] = useState<CrudDivisi[]>([]);
  const [kepengurusanList, setKepengurusanList] = useState<CrudKepengurusan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (err) {
      console.error('Gagal memuat data galeri:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, divisiList, kepengurusanList, isLoading, loadAllData };
}
