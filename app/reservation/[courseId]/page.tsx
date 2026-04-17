import Reservation from '@/views/Reservation';

export default function ReservationPage({ params }: { params: { courseId: string } }) {
  return <Reservation params={params} />;
}
