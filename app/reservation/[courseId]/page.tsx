import Reservation from '@/views/Reservation';
import { getAllStages, getAllCours } from '@/services/supabaseAdmin';

export async function generateStaticParams() {
  const [stagesRes, coursRes] = await Promise.all([
    getAllStages(false),
    getAllCours(false),
  ]);
  const stages = (stagesRes.data || []).map((s) => ({ courseId: s.reservation_slug }));
  const cours = (coursRes.data || []).map((c) => ({ courseId: c.reservation_slug }));
  return [...stages, ...cours];
}

export default function ReservationPage({ params }: { params: { courseId: string } }) {
  return <Reservation params={params} />;
}
