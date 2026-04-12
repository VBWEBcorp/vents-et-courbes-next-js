import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  GraduationCap,
  FileText,
  FileType,
  TrendingUp
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllStages, getAllCours, getAllArticles, getAllPages } from '../../services/supabaseAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    stages: 0,
    cours: 0,
    articles: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [stagesRes, coursRes, articlesRes, pagesRes] = await Promise.all([
        getAllStages(true),
        getAllCours(true),
        getAllArticles(true),
        getAllPages(true)
      ]);

      setStats({
        stages: stagesRes.data?.length || 0,
        cours: coursRes.data?.length || 0,
        articles: articlesRes.data?.length || 0,
        pages: pagesRes.data?.length || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Stages',
      description: 'Gérer les stages',
      icon: Calendar,
      count: stats.stages,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      cardColor: 'bg-green-600',
      link: '/admin/stages'
    },
    {
      title: 'Cours',
      description: 'Gérer les cours',
      icon: GraduationCap,
      count: stats.cours,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      cardColor: 'bg-orange-500',
      link: '/admin/cours'
    },
    {
      title: 'Blog',
      description: 'Gérer les articles',
      icon: FileText,
      count: stats.articles,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
      cardColor: 'bg-slate-700',
      link: '/admin/blog'
    },
    {
      title: 'Pages',
      description: 'Gérer les contenus',
      icon: FileType,
      count: stats.pages,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      cardColor: 'bg-blue-600',
      link: '/admin/pages'
    }
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Vue d'ensemble de votre administration">
      <Helmet>
        <title>Dashboard Admin - Vents et Courbes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      ) : (
        <>
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{item.count}</p>
                    </div>
                    <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Management cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.link)}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-200 text-left group"
                >
                  <div className={`w-14 h-14 ${item.cardColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.count} élément(s)</span>
                    <span className="text-green-400 font-medium group-hover:translate-x-1 transition-transform">
                      Gérer →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Help section */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Guide d'utilisation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Cliquez sur une des cartes ci-dessus pour gérer les stages, cours, articles de blog ou contenus de pages.
                  Vous pourrez ajouter, modifier ou supprimer du contenu en toute simplicité.
                  Les modifications sont instantanément visibles sur le site public.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
