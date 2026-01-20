'use client';

import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '@/lib/btw/api';
import { CrudKepengurusan } from '@/lib/btw/interfaces/btw';

export function useKepengurusan() {
  const [data, setData] = useState<CrudKepengurusan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromAPI('kepengurusan');
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
