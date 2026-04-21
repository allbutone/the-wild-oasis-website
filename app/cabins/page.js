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
      {/* 注意1: */}
      {/* 点击 FilterByCapacity 中的 button 会执行 router.replace(newUrl) 导致 oldUrl -> newUrl, 这个 url state change 对应一次 navigation */}
      {/* 在 app router 中, 所有 navigation 都被包裹在 react startTransition 内, 这意味着: 在 navigation 完成之前, all state update 都将被视为 transition */}
      {/* 注意2: */}
      {/* url state 发生变化后, nextjs client runtime 会请求 nextjs server runtime 获取 server component Page 的 re-render result (payload) */}
      {/* 当 react 拿到 payload 后, 开始基于 working tree 执行 reconcil diff 生成 working tree, 在这个过程中遇到包裹着 Suspense 的 CabinList: */}
      {/* - Suspense 未指定 key, react 会直接复用该 Suspense, 其内的 CabinList 已经是 mounted 状态, 只需 react 从 payload 中拿 CabinList 对应的内容 hydrate 即可(这个过程不会 throw promise, 也就不会触发 fallback) */}
      {/* - Suspense 指定了 key, react 会卸载 old Suspense, 并创建 new Suspense, 其内的 CabinList 在 mount 时会 throw promise, 导致触发 Suspense 的 fallback */}
      <Suspense fallback={<Spinner />} key={capacityType}>
        <CabinList capacityType={capacityType ?? 'all'} />
      </Suspense>
    </div>
  );
}
