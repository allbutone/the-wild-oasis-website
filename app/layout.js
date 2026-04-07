// import tailwind css file in order to use it.
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import Image from "next/image";
import bg from '@/public/bg.png';

// Layout 中只会指定 <body> 而不会指定 <head>, 这是因为:
// nextjs 会默认使用 exported variable 'metadata' 来生成 <head>
// 具体参考: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
export const metadata = {
  // title: "the wild oasis website",
  title: {
    // template 中的 %s 表示 child route 所定义的 metadata.title
    // template 仅对 child route 有效, 对 current route 无效
    // template 定义在 layout.js 中有效, 定义在 page.js 中无效, 因为 layout.js 下才有 child route, 而 page.js 下没有 child route
    template: "%s | the wild oasis website",
    // 如果定义了 template, 就必须定义 default
    // 如果 target page 没有定义 metadata.title, 其 title 默认为这里的 default
    default: "the wild oasis website",
  },
  // 对应 <meta name="description" content="your_description_here" />
  // 会成为 current page / child page 的 description
  description: "this is the description of the wild oasis website",

  // code-based metadata(如下) 优先于 file-based metadata (在 app 下的 icon.png)
  icons: {
    icon: "/logo_babyshark.png",
  },
};

// Josefin_Sans 是以 font name 命名的 function:
const josefin = Josefin_Sans({
  subsets: ["latin"], // 只要字体中的 latin 字符集, 可以显著减少 font 的 bundle size
  display: "swap", // 当加载 target font 'Josefin_sans' 时, 先展示 default font 作为 fallback
});
console.log(josefin); // 查看结构
export default function Layout({ children }) {
  return (
    <html className={josefin.className}>
      <body className="antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
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
        <Image src={bg} alt="Mountains and forests with two cabins" fill className="object-cover object-top" />

        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
