import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const cabins = await getCabins();

  // [paramsObj, paramsObj...]
  // 其中 paramsObj.cabinId 对应 route segment 'cabinId'
  // param 是 string, 实际获取到的 cabinId 是 number, 需要做转换, 否则 build 会报错
  return cabins.map((c) => ({ cabinId: String(c.id )})); 
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
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            fill
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
