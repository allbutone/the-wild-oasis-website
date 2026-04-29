"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteBookingAction } from "../_lib/action.js";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini.js";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("you sure to delete this booking?")) {
      startTransition(() =>  deleteBookingAction(bookingId));
    }
  }
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDelete}
    >
      {isPending ? (
        <span className="m-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
