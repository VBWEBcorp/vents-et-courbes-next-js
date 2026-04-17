import Reservation from '@/views/Reservation';

export default async function ReservationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  return <Reservation params={resolvedParams} />;
}
