'use client';

import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { DetailAnggota } from '@/lib/btw/interfaces/btw';

export function useDetailAnggota() {
  const [data, setData] = useState<DetailAnggota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const detailData: DetailAnggota[] =
        await fetchDataFromAPI('detail_anggota');
      setData(detailData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    reload: load,
  };
}
