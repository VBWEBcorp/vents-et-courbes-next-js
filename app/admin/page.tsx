import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminDashboard from '@/views/admin/Dashboard';

export const metadata: Metadata = {
  title: 'Dashboard Admin - Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
