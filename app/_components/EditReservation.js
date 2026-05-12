"use client"; // hook 'useLinkStatus' 需要在 client component 内使用

import Link from "next/link.js";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini.js";
import { useLinkStatus } from "next/link";

export default function EditReservation({ bookingId }) {
  return (
    <Link
      href={`/account/reservations/edit/${bookingId}`}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {/* 内部借助 hook 'useLinkStatus' 实现 edit label 从 'edit' 变为 'editing' */}
      <EditLabel />
    </Link>
  );
}

function EditLabel() {
  const { pending } = useLinkStatus();
  return (
    <>
      {pending ? (
        <span className="m-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Edit</span>
        </>
      )}
    </>
  );
}
