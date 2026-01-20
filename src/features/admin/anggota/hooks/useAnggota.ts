'use client';

import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';

export function useAnggota() {
  const [data, setData] = useState<CrudAnggota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const anggotaData = await fetchDataFromAPI('anggota')
      setData(anggotaData);
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
