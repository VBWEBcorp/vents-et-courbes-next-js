import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AtelierReservation from '@/views/AtelierReservation';
import { ATELIER_FORMULES, getAtelierFormuleBySlug } from '@/lib/ateliers';

export async function generateStaticParams() {
  return ATELIER_FORMULES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const formule = getAtelierFormuleBySlug(params.slug);
  if (!formule) {
    return {
      title: 'Atelier Partage - Vents et Courbes',
    };
  }
  return {
    title: formule.seoTitle,
    description: formule.seoDescription,
    alternates: { canonical: `https://ventsetcourbes.org/atelier-partage/${formule.slug}` },
    openGraph: {
      title: formule.seoTitle,
      description: formule.seoDescription,
      url: `https://ventsetcourbes.org/atelier-partage/${formule.slug}`,
    },
  };
}

export default function AtelierFormulePage({ params }: { params: { slug: string } }) {
  const formule = getAtelierFormuleBySlug(params.slug);
  if (!formule) {
    notFound();
  }
  return <AtelierReservation formule={formule} />;
}
