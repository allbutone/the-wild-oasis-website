import ReservationCard from "@/app/_components/ReservationCard.js";
import Spinner from "@/app/_components/Spinner.js";
import { getBookings } from "@/app/_lib/data-service.js";
import { auth } from "@/auth.js";
import Link from "next/link.js";
import { Suspense } from "react";

export const metadata = {
  title: "reservations page",
};
async function ReservationList() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  return (
    <>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </>
  );
}
export default async function Page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      <Suspense fallback={<Spinner />}>
        <ReservationList />
      </Suspense>
    </div>
  );
}
