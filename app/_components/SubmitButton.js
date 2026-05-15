"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingText }) {
  // useFormStatus 已经 deprecated, 推荐使用 useTransition 或 useActionState
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? pendingText : children}
    </button>
  );
}
