'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { getAllArticles, ArticleBlog } from '../services/supabaseAdmin';

interface BlogProps {
  title?: string;
  description?: string;
}

const Blog: React.FC<BlogProps> = ({ title, description }) => {
  const [articles, setArticles] = useState<ArticleBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await getAllArticles(false);
        if (fetchError) throw fetchError;
        setArticles(data || []);
      } catch (err) {
        setError('Impossible de charger les articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
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
    <section className="bg-stone-50 py-16 md:py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-400 mb-4 float-delay">
            {title || "Nos actualites"}
          </h2>
          <div className="w-24 h-1 bg-primary-400 mx-auto mb-6 md:mb-8 scale-in"></div>
          <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed fade-in-delay">
            {description || "Suivez l'actualite de notre atelier, nos nouveaux cours, expositions et evenements creatifs"}
          </p>
        </div>

        <div className="fade-in-delay">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-600">Chargement des articles...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-red-600">{error}</div>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-600">Aucun article trouve</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.slice(0, 3).map((article) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover stagger-item"
                >
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
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 bounce-in">
                      <span className="bg-primary-400 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium">
                        Blog
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-3 md:mb-4">
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
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3 leading-tight hover:text-primary-400 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center text-primary-400 hover:text-primary-500 font-medium transition-colors group text-sm md:text-base"
                    >
                      Lire la suite
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
