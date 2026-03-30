// 发现一个现象: 如果删掉 app/layout.js 的话

import Navigation from "./components/Navigation";

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
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
