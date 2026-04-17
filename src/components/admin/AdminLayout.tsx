'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  FileText,
  FileType,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { signOutAdmin } from '../../services/supabaseAdmin';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOutAdmin();
    router.push('/admin/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Stages',
      icon: Calendar,
      path: '/admin/stages',
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Cours',
      icon: GraduationCap,
      path: '/admin/cours',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Blog',
      icon: FileText,
      path: '/admin/blog',
      color: 'text-slate-700 bg-slate-50'
    },
    {
      title: 'Pages',
      icon: FileType,
      path: '/admin/pages',
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-stone-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Admin</h2>
              <p className="text-xs text-gray-600">Vents et Courbes</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? `${item.color} font-medium`
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span>Déconnexion</span>
          </button>
          <a
            href="https://ventsetcourbes.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-gray-600 hover:text-green-400 transition-colors"
          >
            Voir le site →
          </a>
          <p className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
            Plateforme développée par vbweb.fr
          </p>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Admin</h2>
                  <p className="text-xs text-gray-600">Vents et Courbes</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? `${item.color} font-medium`
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-3">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
                <span>Déconnexion</span>
              </button>
              <a
                href="https://ventsetcourbes.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-gray-600 hover:text-green-400 transition-colors"
              >
                Voir le site →
              </a>
              <p className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                Plateforme développée par vbweb.fr
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" strokeWidth={2} />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                  {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
