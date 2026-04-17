import type { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import BlogManagement from '@/views/admin/BlogManagement';

export const metadata: Metadata = {
  title: 'Gestion Blog - Admin Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminBlogPage() {
  return (
    <ProtectedRoute>
      <BlogManagement />
    </ProtectedRoute>
  );
}
