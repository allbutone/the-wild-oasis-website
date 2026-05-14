import ReservationList from "@/app/_components/ReservationList.js";
import { getBookings } from "@/app/_lib/data-service.js";
import { auth } from "@/auth.js";

export const metadata = {
  title: "reservations page",
};
export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      <ReservationList bookings={bookings} />
    </div>
  );
}
