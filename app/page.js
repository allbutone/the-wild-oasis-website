import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export const metadata = {
  // 具体 page 中的 metadata.title 会覆盖"layout 中的 metadata.title";
  title: "root page title",
};

export default function Page() {
  return (
    <main className="mt-24">
      {/* 
          在 在 body > main > Image 结构中, 如果希望让 Image 填充所在元素/容器(main), 则需要为 Image 指定 prop `fill` 
          此时 Image 对应的元素会被添加样式如下, 变成 absolute positioned element 
          - position: absolute; 
          - inset: 0 
          由于 absolute positioned element 会参照 nearest positioned element 进行定位
          因此需要将 Image 的某个 parent element 的 position 设置为 non-static value
          但实测发现 body 设置 `position:relative` 后仍会输出 wanrning log: 
          [browser] Image with src "/_next/static/media/bg.0w8d73.ly3-kc.png" has "fill" and parent element with invalid "position"
          Provided "static" should be one of absolute,fixed,relative.
          问了 AI 才知道, 原来 nextjs 在运行时还会额外要求: Image 的直接 parent(即 main) 必须是 positioned element

          object-fit 指定填充方式, 例如 cover 表示超出部分将被 cover (遮盖):
          <Image src={bg} alt="Mountains and forests with two cabins" fill objectFit="cover" /> 
          server log 里提示 prop `objectFit` 已经弃用, 参考日志给出的链接:
          https://nextjs.org/docs/messages/next-image-upgrade-to-13
          修改如下即可:
          <Image src={bg} alt="Mountains and forests with two cabins" fill className="object-cover" />

          object-position 指定填充前的对齐方式, 例如 `top` 表示先将 Image top 和 container (main) top 对齐, 然后再按 object-fit 进行填充
        */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={75}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

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
  );
}
