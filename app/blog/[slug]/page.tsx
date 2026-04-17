import BlogPostDetail from '@/views/BlogPostDetail';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostDetail params={params} />;
}
