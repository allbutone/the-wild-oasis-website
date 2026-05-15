import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getCabin, getCabins } from "@/app/_lib/data-service.js";
import Reservation from "../../_components/Reservation.js";
import Spinner from "@/app/_components/Spinner.js";
import ReservationReminder from "../../_components/ReservationReminder.js";
import CabinDescription from "../../_components/CabinDescription.js";

export async function generateStaticParams() {
  const cabins = await getCabins();

  // [paramsObj, paramsObj...]
  // 其中 paramsObj.cabinId 对应 route segment 'cabinId'
  // param 是 string, 实际获取到的 cabinId 是 number, 需要做转换, 否则 build 会报错
  return cabins.map((c) => ({ cabinId: String(c.id) }));
}

export async function generateMetadata({ params, searchParams }) {
  // const { cabinId } = params;
  // 上述 destruction 会报错:
  // Error: Route "/cabins/[cabinId]" used `params.cabinId`. `params` is a Promise and must be unwrapped with `await` or `React.use()` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
  // 因为 params 是一个 promise, 需要这样使用:
  const { cabinId } = await params;

  return {
    title: `cabin-${cabinId}`,
  };
}
export default async function Page({ params }) {
  // 在 nextjs v15 之前, 可以直接使用 params 的 property 如下:
  // const cabin = await getCabin(params.id);
  // 在 nextjs v15 之后, 却会报错:
  // Error: Route "/cabins/[id]" used `params.id`
  // `params` is a Promise and must be unwrapped with `await` or `React.use()`
  // before accessing its properties. Learn more:
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  // 这是因为: params 不再是一个 object 而是 promise, 只能先 resolve 再 destruct:
  const resolvedParams = await params;
  // 查看 params 的结构:
  // console.log("resolved params:", resolvedParams); // resolved params: { cabinId: '67' }

  const cabin = await getCabin(resolvedParams.cabinId);
  if (!cabin) {
    // 执行 notFound() 会抛出 NEXT_HTTP_ERROR_FALLBACK;404 error
    // 导致该 error 的 route segment 会停止 rendering
    // 转而 render `not-found file` 的内容
    // 也就是说: 执行 notFound() 后, 会展示 not-found.js 的内容
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDescription cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* 
          第一种查询方式:
            parent component(例如 Page) 将 cabin 以 prop 形式传递给 child component(例如 Reservation)
            Reservation 下谁需要 cabin 都可以直接使用, 无需查询 -> 最终只查询一次 cabin
          第二种查询方式:
            parent component(例如 Page) 不将 cabin 以 prop 形式传递给 child component (例如 Reservation)
            Reservation 下谁需要 cabin 谁自己查询 -> cabin 被用到多少次, 就查询多少次
            但得益于 request memoization 的 de-dup 机制, 最终也是只查询一次 cabin 
          */}
        {/* 下面使用第一种查询方式: */}
        {/* 
          如果不添加如下 Suspense, 就会默认使用 loading.js 这个 page-level 的 Suspense, 导致: 
          如果 Reservation 内的数据没有加载完毕, Page 内除 Reservation 外的其他信息也
          无法展示, 只能看到 page-level loading spinner 
        */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  );
}
