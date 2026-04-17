import BlogPostDetail from '@/views/BlogPostDetail';
import { getAllArticles } from '@/services/supabaseAdmin';

export async function generateStaticParams() {
  const { data } = await getAllArticles(false);
  return (data || []).map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostDetail params={params} />;
}
