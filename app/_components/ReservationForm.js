"use client";

import { useReservation } from "./ReservationContext.js";
import { createBookingAction } from "../_lib/action.js";
import SubmitButton from "./SubmitButton.js";

function ReservationForm({ cabin, currentUser }) {
  const { maxCapacity } = cabin;
  const { range, setRange, resetRange } = useReservation();

  // - 如果指定 formAction={createBookingAction}:
  //    createBookingAction 只会收到一个实参 formData, 无法得到 newBooking 所需的全部信息
  // - 参考 https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments 修改如下:
  //    - const formAction=createBookingAction.bind(null, currentUser, cabin, range);// ${currentUser} booked ${cabin} for ${range} days
  //    - formAction={formAction} // 当 form submission 发生时, 会调用 formAction, 继而调用 createBookingAction, 并:
  //       - 使用 null 作为 this
  //       - 传递的实参列表为: (currentUser, cabin, range, formData)
  //
  // ${currentUser} booked ${cabin} for ${range} days
  const formAction = createBookingAction.bind(null, currentUser, cabin, range);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as {currentUser.name}</p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await formAction(formData);
          // 添加 reservation 成功后, 需要重置 context 中的 range
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* <p> {`from ${range.from} to ${range.to}`}</p> */}

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/* 即便是只预订一天, 也得选择 range.from 和 range.to */}
          {range.from && range.to ? (
            <SubmitButton pendingText={"Reserving"}>Reserve Now</SubmitButton>
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
