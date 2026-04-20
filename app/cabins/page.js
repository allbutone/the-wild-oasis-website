// 启用 page level cache (Full Route Cache) 并每隔 60s 后由 first request 会触发 update
// 此时为 static route, 可以观察到 ISR
// "use cache"; // must be at the top of the file // Page 使用了 prop 'searchParam' 后, 就被标记为 dynamic route 了, 此时无法搭配 'use cache' 使用, 否则报错

import { Suspense } from "react";
import CabinList from "./CabinList";
import Spinner from "../_components/Spinner";
// import { cacheLife } from "next/cache"; // Page 使用了 prop 'searchParam' 后, 就被标记为 dynamic route 了, 此时无法搭配 'use cache' 使用, 否则报错
import FilterByCapacity from "./FilterByCapacity";

export const metadata = {
  title: "cabins",
};

// page 现用现取, 不放在 page level cache (Full Route Cache) 中
// 此时为 dynamic route, 无法观察到 ISR (基于 Full Route Cache)
// export const revalidate=0

// 启用 page level cache (Full Route Cache) 并每隔 60s 后由 first request 会触发 update
// 此时为 static route, 可以观察到 ISR
// export const revalidate=60

export default async function Page({params, searchParams}) {
  // cacheLife("minutes"); //必须在声明了 'use cache' 的 function 内执行 // Page 使用了 prop 'searchParam' 后, 就被标记为 dynamic route 了, 此时无法搭配 'use cache' 使用, 否则报错

  const {capacityType} = await searchParams;

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
      <div className="flex justify-end mb-5">
        <FilterByCapacity />
      </div>
      <Suspense fallback={<Spinner />}>
        <CabinList capacityType={capacityType ?? 'all'} />
      </Suspense>
    </div>
  );
}
