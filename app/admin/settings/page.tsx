import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import SettingsManagement from '@/views/admin/SettingsManagement';

export const metadata: Metadata = {
  title: 'Réglages - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsManagement />
    </ProtectedRoute>
  );
}
