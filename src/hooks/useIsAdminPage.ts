'use client';
import { usePathname } from 'next/navigation';

export const useIsAdminPage = () => {
  const pathname = usePathname();
  return pathname.startsWith('/admin');
};
