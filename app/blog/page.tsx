import type { Metadata } from 'next';
import BlogIndex from '@/views/BlogIndex';

export const metadata: Metadata = {
  title: 'Blog Céramique Paris - Actualités Atelier Vents et Courbes Le Pré-Saint-Gervais',
  description: 'Blog céramique de l\'Atelier Vents et Courbes au Pré-Saint-Gervais : actualités, conseils tournage, techniques modelage, nouveautés formation céramique Paris.',
  alternates: { canonical: 'https://ventsetcourbes.org/blog' },
  openGraph: {
    title: 'Blog Céramique Paris - Actualités Atelier Vents et Courbes',
    description: 'Blog céramique de l\'Atelier Vents et Courbes au Pré-Saint-Gervais : actualités, conseils tournage, techniques modelage.',
    url: 'https://ventsetcourbes.org/blog',
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}
