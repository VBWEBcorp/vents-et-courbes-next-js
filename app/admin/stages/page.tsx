import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import StagesManagement from '@/views/admin/StagesManagement';

export const metadata: Metadata = {
  title: 'Gestion Stages - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminStagesPage() {
  return (
    <ProtectedRoute>
      <StagesManagement />
    </ProtectedRoute>
  );
}
