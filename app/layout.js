// import tailwind css file in order to use it.
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

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
      <body className="antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col">
        <Header />
        {/* layout.js 负责将 target page 的内容加载到 children 里 */}
        {/* 在加载过程中, 会先使用 loading.js 的内容作为 children */}
        {/* 实测发现: sub route 的 loading.js 会优先于 route 的 loading.js */}
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto bg-red-500">{children}</main>
        </div>
      </body>
    </html>
  );
}
