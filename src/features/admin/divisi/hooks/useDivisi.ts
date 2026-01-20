'use client';

import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { CrudDivisi } from '@/lib/btw/interfaces/btw';

export function useDivisi() {
  const [data, setData] = useState<CrudDivisi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromAPI('divisi');
      setData(res);
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
