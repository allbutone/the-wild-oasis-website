"use client";

import ReservationCard from "@/app/_components/ReservationCard.js";
import Link from "next/link.js";
import { useOptimistic } from "react";
import { deleteBookingAction } from "../_lib/action.js";

export default function ReservationList({ bookings }) {
  const [optimisticBookings, setOptimistic] = useOptimistic(
    bookings,
    (currentBookings, id) => {
      // 根据真实的 currentBookings 和 setOptimistic 传来的 id 来计算 optimisticBookings
      console.log(`currentBookings:`, currentBookings);
      console.log(`id:`, id);
      const result = currentBookings.filter((b) => b.id !== id);

      console.log(`new optimistic bookings:`, result);
      return result;
    },
  );

  // 根据 Action props 的约定: 将 deleteBookAction 作为 prop 'action' 传给目标组件
  // 目标组件应确保以 startTransition(action) 的形式执行 action
  async function onBookingDelAction(formData) {
    const id = Number(formData.get("bookingId"));
    setOptimistic(id); // 此时会 re-render ReservationList with optimisticBookings

    // 实际删除预订(reservation):
    // 可以在 client component 中调用 server action 'deleteBookingAction' 但不能调用 server function `deleteBooking`
    await deleteBookingAction(formData);
    // onBookingDelAction 执行过程, 分两种情况:
    // - Transition 失败
    //   - optimisticBookings 为 expected new bookings
    //   - await deleteBookingAction(formData) 失败, Transition 失败
    //   - optimisticBookings 回退为 old bookings
    //
    // - Transiton 成功
    //   - optimisticBookings 为 expected new bookings
    //   - await deleteBookingAction(formData) 成功, Transition 成功
    //     - 如果 bookings 是 state, 应在 await deleteBookingAction(formData) 后执行 setBookings(latestBookings);
    //     - 如果 bookings 是 prop, 确保 deleteBookingAction 内会 revalidate current route 来 update prop 'bookings' to latest
    //   - optimisticBookings 和 new bookings 一致, 都是 latest bookings
  }

  return (
    <>
      {optimisticBookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard
              booking={booking}
              key={booking.id}
              onBookingDelAction={onBookingDelAction}
            />
          ))}
        </ul>
      )}
    </>
  );
}
