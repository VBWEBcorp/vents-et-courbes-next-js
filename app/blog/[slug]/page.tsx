import BlogPostDetail from '@/views/BlogPostDetail';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogPostDetail params={resolvedParams} />;
}
