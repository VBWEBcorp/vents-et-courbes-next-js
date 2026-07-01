// Build-time data access (SSG). Runs in Node during `next build` /
// generateStaticParams — never shipped to the browser. The live site reads
// through the Netlify Functions instead (see src/services/api client).
import { collection, COLLECTIONS, ArticleBlog, Stage, Cours } from './models';

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
