'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import { getArticleBySlug, ArticleBlog } from '../services/supabaseAdmin';

const BlogPostDetail = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const router = useRouter();
  const [article, setArticle] = useState<ArticleBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        console.log('Aucun slug fourni');
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        console.log('📖 Chargement de l\'article avec le slug:', slug);
        setLoading(true);
        const { data, error: fetchError } = await getArticleBySlug(slug);

        if (fetchError) throw fetchError;

        if (data) {
          console.log('✅ Article chargé avec succès:', data.title);
          setArticle(data);
        } else {
          console.log('⚠️ Article non trouvé pour le slug:', slug);
          setNotFound(true);
        }
      } catch (err) {
        console.error('❌ Erreur lors du chargement de l\'article:', err);
        setError('Impossible de charger l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  if (notFound) {
    router.replace('/blog');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-32 px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600 mb-8">L'article que vous cherchez n'existe pas ou a été supprimé.</p>
            <Link 
              href="/blog" 
              className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-full transition-colors"
            >
              Retour aux articles
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <StructuredData
        pageType="blogPost"
        blogPost={{
          title: article.title,
          description: article.excerpt,
          publishedDate: article.published_date,
          author: article.author?.name || 'Atelier Vents et Courbes',
          image: article.image_url
        }}
      />
      
      <Header />
      
      {/* Article Header */}
      <article className="bg-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 fade-in">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Retour aux articles
            </Link>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 fade-in-delay">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
              {formatDate(article.published_date)}
            </div>
            {article.author && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" strokeWidth={1.5} />
                {article.author.name}
              </div>
            )}
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" strokeWidth={1.5} />
              {article.content ? estimateReadingTime(article.content) : 0} min de lecture
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight fade-in-delay-2">
            {article.title}
          </h1>

          {/* Article Excerpt */}
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 font-light slide-up">
              {article.excerpt}
            </p>
          )}

          {/* Featured Image */}
          {article.image_url && (
            <div className="mb-12 slide-up-delay">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Article Content */}
      <section className="bg-stone-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none slide-up-delay-2">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="markdown-content text-gray-700 leading-relaxed">
                {formatContent(article.content)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      {article.author && (
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-stone-50 rounded-2xl p-8 md:p-12">
              <div className="flex items-start space-x-6">
                {article.author.image_url && (
                  <img
                    src={article.author.image_url}
                    alt={article.author.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-3">
                    {article.author.name}
                  </h3>
                  {article.author.bio && (
                    <p className="text-gray-700 leading-relaxed">
                      {article.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostDetail;