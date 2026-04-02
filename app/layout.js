import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

// import tailwind css file in order to use it.
import '@/app/_styles/globals.css';

// Layout 中只会指定 <body> 而不会指定 <head>, 这是因为:
// nextjs 会默认使用 exported variable 'metadata' 来生成 <head>
// 具体参考: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
export const metadata = {
  title: "the wild oasis website",
};

// 原本不会导致 hard reload 的 <Link /> 实际却触发了 hard reload
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        {/* layout.js 负责将 target page 的内容加载到 children 里 */}
        {/* 在加载过程中, 会先使用 loading.js 的内容作为 children */}
        {/* 实测发现: sub route 的 loading.js 会优先于 route 的 loading.js */}
        <main>{children}</main>
      </body>
    </html>
  );
}
