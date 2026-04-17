import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import PageManagement from '@/views/admin/PageManagement';

export const metadata: Metadata = {
  title: 'Gestion Pages - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminPagesPage() {
  return (
    <ProtectedRoute>
      <PageManagement />
    </ProtectedRoute>
  );
}
