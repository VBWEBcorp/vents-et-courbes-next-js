'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import { getAllArticles, ArticleBlog } from '../services/supabaseAdmin';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const BlogIndex = () => {
  const [articles, setArticles] = useState<ArticleBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<SectionContent>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contentData, articlesResult] = await Promise.all([
          getPageContentBySection('blog'),
          getAllArticles(false)
        ]);
        setContent(contentData);
        if (articlesResult.error) throw articlesResult.error;
        setArticles(articlesResult.data || []);
      } catch (err) {
        setError('Impossible de charger les articles');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">

      <StructuredData pageType="blog" />

      <Header />

      <section className="bg-white pt-32 pb-16 md:pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Accueil
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-primary-400 mb-6 leading-tight fade-in">
              {content.hero_title?.title || 'Nos actualités'}
            </h1>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 fade-in-delay">
              {content.hero_description?.content || 'Découvrez nos derniers articles, conseils et actualités autour de la céramique'}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des articles...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary-400 hover:text-primary-500 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">Aucun article trouvé</p>
              <p className="text-gray-500">Les articles apparaîtront ici une fois publiés</p>
            </div>
          ) : (
            <>
              <div className="mb-8 fade-in">
                <p className="text-gray-600">
                  {articles.length} article{articles.length > 1 ? 's' : ''} trouvé{articles.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-delay">
                {articles.map((article, index) => (
                  <article
                    key={article.slug}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover stagger-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden image-zoom">
                        <img
                          src={article.image_url || "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg"}
                          alt={article.title}
                          className="w-full h-48 md:h-64 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg";
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                            Blog
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          {formatDate(article.published_date)}
                        </div>
                        {article.author && (
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" strokeWidth={1.5} />
                            {article.author.name}
                          </div>
                        )}
                      </div>

                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight hover:text-primary-400 transition-colors">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {article.excerpt}
                      </p>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-primary-400 hover:text-primary-500 font-medium transition-colors group"
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogIndex;
