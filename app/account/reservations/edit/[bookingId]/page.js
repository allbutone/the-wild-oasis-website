import UpdateReservationForm from "@/app/_components/UpdateReservationForm.js";
import { getBooking, getCabin } from "@/app/_lib/data-service.js";

export default async function Page({ params, searchParams }) {
  const { bookingId } = await params;
  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <UpdateReservationForm booking={booking} cabin={cabin} />
    </div>
  );
}
