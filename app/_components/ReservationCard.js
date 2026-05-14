import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image.js";
import EditReservation from "./EditReservation.js";
import DeleteReservation from "./DeleteReservation.js";
import { TrashIcon } from "@heroicons/react/24/solid";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onBookingDelAction }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* react 扩展了 form 的功能 */}
      {/* - 当 prop 'action' 是 URL 时, 其行为和 native form 一致 */}
      {/* - 当 prop 'action' 是 function 时, 该 function 会被包裹在 startTransition 内调用, 且唯一实参为 formData */}
      <form
        action={onBookingDelAction}
        className="flex flex-col border-l border-primary-800 min-w-[100px]"
      >
        <input type="hidden" name="bookingId" defaultValue={id} />
        {/* isPast(new Date(startDate)) 意思是: 过了 startDate 仍未 check in 的 booking, 即: 过期的预订 */}
        {isPast(new Date(startDate)) ? null : (
          <>
            <EditReservation bookingId={id} />

            {/* 使用 useFormStatus 来更新 ReservationList UI:  */}
            {/* 删除 reservation 过程中, ReservationCard 的 delete button 展示 spinner */}
            {/* <DeleteReservation /> */}

            {/* 使用 useOptimistic 来更新 ReservationList UI:  */}
            {/* 删除 reservation 过程刚开始时, 直接将 ReservationCard 从 UI 去除 */}
            <button className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
              <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Delete</span>
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ReservationCard;
