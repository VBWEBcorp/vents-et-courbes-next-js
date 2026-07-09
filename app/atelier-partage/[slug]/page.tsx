import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AtelierReservation from '@/views/AtelierReservation';
import {
  getActiveAtelierFormuleSlugs,
  getAtelierFormuleBuild,
} from '../../../lib/server/data';

export async function generateStaticParams() {
  const slugs = await getActiveAtelierFormuleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formule = await getAtelierFormuleBuild(slug);
  if (!formule) {
    return { title: 'Atelier Partagé - Vents et Courbes' };
  }
  return {
    title: formule.seo_title,
    description: formule.seo_description,
    alternates: { canonical: `https://ventsetcourbes.org/atelier-partage/${formule.slug}` },
    openGraph: {
      title: formule.seo_title,
      description: formule.seo_description,
      url: `https://ventsetcourbes.org/atelier-partage/${formule.slug}`,
    },
  };
}

export default async function AtelierFormulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formule = await getAtelierFormuleBuild(slug);
  if (!formule) {
    notFound();
  }
  return <AtelierReservation slug={slug} initialFormule={formule} />;
}
