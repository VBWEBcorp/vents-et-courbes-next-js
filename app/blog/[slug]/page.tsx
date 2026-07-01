import BlogPostDetail from '@/views/BlogPostDetail';
import { getActiveBlogSlugs } from '../../../lib/server/data';

export async function generateStaticParams() {
  const slugs = await getActiveBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostDetail params={params} />;
}
