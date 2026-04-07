import Image from "next/image";
import Link from "next/link";
import bg from '@/public/bg.png';

export const metadata = {
  // 具体 page 中的 metadata.title 会覆盖"layout 中的 metadata.title";
  title: "root page title",
};

export default function Page() {
  return (
    <>
      <main className="mt-24">
        {/* 如果希望让图片填充所在元素/容器, 则需要为 Image 指定 prop fill */}
        {/* 此后 Image 对应的元素会被添加样式: */}
        {/* - position: absolute; */}
        {/* - inset: 0 */}
        {/* 此时应将 Image 的父元素设置为 positioned element (non-static 即可) */}
        {/* 以便 fill (填充) 能够生效, 此外还需设置 prop 'objectFit' 设置填充效果 */}
        {/* <Image src={bg} alt="Mountains and forests with two cabins" fill objectFit="cover" /> */}
        {/* server log 里提示 objectFit 已经弃用了
        因此参考 https://nextjs.org/docs/messages/next-image-upgrade-to-13 修改如下: */}
        <Image src={bg} alt="Mountains and forests with two cabins" fill className="object-cover" />

        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    </>
  );
}
