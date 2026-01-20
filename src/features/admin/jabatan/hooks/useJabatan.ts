'use client';

import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { CrudJabatan } from '@/lib/btw/interfaces/btw';

export function useJabatan() {
  const [data, setData] = useState<CrudJabatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromAPI('jabatan');
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    setData,
    setIsLoading,
    isLoading,
    reload: load,
  };
}
