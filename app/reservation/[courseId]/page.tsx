import Reservation from '@/views/Reservation';
import { getActiveReservationSlugs } from '../../../lib/server/data';

export async function generateStaticParams() {
  const slugs = await getActiveReservationSlugs();
  return slugs.map((courseId) => ({ courseId }));
}

export default async function ReservationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  return <Reservation params={resolvedParams} />;
}
