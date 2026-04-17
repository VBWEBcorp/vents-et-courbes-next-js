import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import CoursManagement from '@/views/admin/CoursManagement';

export const metadata: Metadata = {
  title: 'Gestion Cours - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminCoursPage() {
  return (
    <ProtectedRoute>
      <CoursManagement />
    </ProtectedRoute>
  );
}
