// 发现一个现象: 如果删掉 app/layout.js 的话
// 原本不会导致 hard reload 的 <Link /> 实际却触发了 hard reload
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
