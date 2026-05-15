"use client";

import ReservationCard from "@/app/_components/ReservationCard.js";
import Link from "next/link.js";
import { useOptimistic } from "react";
import { deleteBookingAction } from "../_lib/action.js";

export default function ReservationList({ bookings }) {
  const [optimisticBookings, setOptimistic] = useOptimistic(
    bookings,
    // updater fn
    (currentOptimisticBookings, id) => {
      return currentOptimisticBookings.filter((b) => b.id !== id);
    },
  );

  // 根据 Action props 的约定: 将 onBookingDelAction 作为 prop 'action' 传给目标组件
  // 目标组件应确保以 startTransition(action) 的形式执行 action
  async function onBookingDelAction(formData) {
    const id = Number(formData.get("bookingId"));
    setOptimistic(id); // 此时会 re-render ReservationList with optimisticBookings

    // 实际删除预订(reservation):
    // 可以在 client component 中调用 server action 'deleteBookingAction' 但不能调用 server function `deleteBooking`
    await deleteBookingAction(formData);
    // onBookingDelAction 执行过程, 分两种情况:
    // - case-1:
    //   1. optimisticBookings 为 expected new bookings
    //   2. await deleteBookingAction(formData) 失败, Transition 结束
    //   3. optimisticBookings 回退为 prop 'bookings' (old bookings)
    //
    // - case-2:
    //   1. optimisticBookings 为 expected new bookings
    //   2. await deleteBookingAction(formData) 成功, Transition 结束
    //     - 如果 bookings 是 state, 应在 await deleteBookingAction(formData) 后 update state to latest:
    //       startTransition(() => {
    //           setBookings(latestBookings); // await statement 后的异步 state update 应额外包裹 startTransition
    //       }) ;
    //     - 如果 bookings 是 prop, 应确保 deleteBookingAction 会 re-render parent component 来 update prop to latest:
    //       例如: 在 deleteBookingAction 内执行 revalidatePath('currentRoute') 来 re-render parent component
    //   3. optimisticBookings 和 state/prop 'bookings' 一致, 都是 latest bookings
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
