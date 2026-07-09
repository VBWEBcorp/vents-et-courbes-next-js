import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AtelierPartageManagement from '@/views/admin/AtelierPartageManagement';

export const metadata: Metadata = {
  title: 'Atelier partagé - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminAtelierPartagePage() {
  return (
    <ProtectedRoute>
      <AtelierPartageManagement />
    </ProtectedRoute>
  );
}
