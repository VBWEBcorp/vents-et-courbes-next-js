// Build-time data access (SSG). Runs in Node during `next build` /
// generateStaticParams — never shipped to the browser. The live site reads
// through the Netlify Functions instead (see src/services/api client).
import { collection, COLLECTIONS, ArticleBlog, Stage, Cours, AtelierFormule } from './models';
import {
  hardcodedAtelierDocs,
  getHardcodedAtelierDoc,
  type AtelierFormuleDoc,
} from '../../src/lib/ateliers';

export async function getActiveBlogSlugs(): Promise<string[]> {
  const col = await collection<ArticleBlog>(COLLECTIONS.blogPosts);
  const docs = await col
    .find({ active: true }, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug).filter(Boolean);
}

export async function getActiveReservationSlugs(): Promise<string[]> {
  const stagesCol = await collection<Stage>(COLLECTIONS.stages);
  const coursCol = await collection<Cours>(COLLECTIONS.cours);
  const [stages, cours] = await Promise.all([
    stagesCol
      .find({ active: true }, { projection: { reservation_slug: 1 } })
      .toArray(),
    coursCol
      .find({ active: true }, { projection: { reservation_slug: 1 } })
      .toArray(),
  ]);
  return [...stages, ...cours]
    .map((d) => d.reservation_slug)
    .filter(Boolean);
}

// Atelier partagé : slugs des formules pour generateStaticParams. Retombe
// sur les formules codées en dur tant que la collection est vide, afin que
// les pages soient toujours générées.
export async function getActiveAtelierFormuleSlugs(): Promise<string[]> {
  const col = await collection<AtelierFormule>(COLLECTIONS.atelierFormules);
  const docs = await col
    .find({ active: true }, { projection: { slug: 1 } })
    .toArray();
  const slugs = docs.map((d) => d.slug).filter(Boolean);
  return slugs.length ? slugs : hardcodedAtelierDocs().map((f) => f.slug);
}

// Snapshot build d'une formule (SEO + contenu initial). Fallback hardcodé.
export async function getAtelierFormuleBuild(
  slug: string,
): Promise<AtelierFormuleDoc | undefined> {
  const col = await collection<AtelierFormule>(COLLECTIONS.atelierFormules);
  const doc = await col.findOne({ slug, active: true });
  if (doc) {
    const { _id, ...rest } = doc as Record<string, unknown>;
    return rest as unknown as AtelierFormuleDoc;
  }
  return getHardcodedAtelierDoc(slug);
}
