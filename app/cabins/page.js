// 启用 page level cache (Full Route Cache) 并每隔 60s 后由 first request 会触发 update
// 此时为 static route, 可以观察到 ISR
"use cache"; // must be at the top of the file

import { Suspense } from "react";
import CabinList from "./CabinList";
import Spinner from "../_components/Spinner";
import { cacheLife } from "next/cache";

export const metadata = {
  title: "cabins",
};

// page 现用现取, 不放在 page level cache (Full Route Cache) 中
// 此时为 dynamic route, 无法观察到 ISR (基于 Full Route Cache)
// export const revalidate=0

// 启用 page level cache (Full Route Cache) 并每隔 60s 后由 first request 会触发 update
// 此时为 static route, 可以观察到 ISR
// export const revalidate=60

export default async function Page() {
  cacheLife("minutes");

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
