import type { Metadata } from 'next';
import AdminLogin from '@/views/admin/Login';

export const metadata: Metadata = {
  title: 'Connexion Admin - Vents et Courbes',
  robots: 'noindex, nofollow',
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
