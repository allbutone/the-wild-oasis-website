"use client";

import { updateBookingAction } from "@/app/_lib/action.js";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateReservationForm({ booking, cabin }) {
  const [currentBooking, updateBooking, isPending] = useActionState(
    updateBookingAction, //server action 对应的 function
    booking
  );
  const router = useRouter();

  useEffect(() => {
    if (currentBooking.success) {
      // 执行 client-side redirection (navigate away 当前组件)
      router.push("/account/reservations");
    }

    // 参考 https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents#navigation-with-activity 可知:
    // 当 cacheComponents 为 true 时, 如果 client-side 执行 redirect(navigate away 当前组件):
    // - 当前组件的 state 会被保留
    // - navigate away 会让组件转为 hidden, 组件的 effect cleanup fn 被执行
    // - navigate back 会让组件转为 visible, 组件的 effect setup fn 被执行
    //
    // 如果没有提供 effect cleanup fn 如下, 会导致:
    // - 组件 mount 时, currentBooking.success 未定义, effect setup 不执行 redirect
    // - 执行 update 操作, currentBooking.success 值为 true, effect setup 执行 redirect (navigate away)
    // - navigate back 时, 由于 currentBooking.success 被保留(仍为true), effect setup 又立刻 redirect
    //   导致还没看到当前组件就直接 navigate away 了
    return () => {
      console.log(`resetting update flag 'success' to false`);
      currentBooking.success = false;
    }
  }, [currentBooking, router]);

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateBooking}
    >
      <input type="hidden" name="bookingId" defaultValue={currentBooking.id} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        {/* 
          - 在 <select> mount 时, react 会使用 prop 'defaultValue' 对其进行重置 
          - 在 <select> re-render 时, react 不会再使用 prop 'defaultValue' 对其进行重置, 而是直接忽略 defaultValue 
            导致: submit form -> currentBooking 有变 -> <form> re-render -> <select> re-render -> <select> 无法根据 latest value of prop 'defaultValue' 进行重置

          如果是其他 input element 例如 <input /> <textarea /> 等, 就不存在这个问题

          解决方式:
          将 <select defaultValue={currentBooking.numGuests} /> 修改为 <select defaultValue={currentBooking.numGuests} key={currentBooking.numGuests}/>
          强制 <select> 重新 mount, 此时就会用到 latest value of prop 'defaultValue'
        */}
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          key={currentBooking.numGuests}
          defaultValue={currentBooking.numGuests}
          required
        >
          {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
            (x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={currentBooking.observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          {isPending ? "Updating..." : "Update reservation"}
        </button>
      </div>
    </form>
  );
}
