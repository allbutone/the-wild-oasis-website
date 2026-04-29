"use client";

export default function error({ error, unstable_retry }) {
  return (
    <div className="text-center">
      <h1 className="mb-5">{error.message}</h1>
      <button onClick={unstable_retry} className="bg-primary-700 text-primary-100 border-primary-100 border px-5 py-2 rounded-2xl">Try Again</button>
    </div>
  );
}
