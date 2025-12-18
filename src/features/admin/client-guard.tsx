'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 768) {
      router.replace('/mobile-locked');
    }
  }, [router]);

  return <>{children}</>;
}
