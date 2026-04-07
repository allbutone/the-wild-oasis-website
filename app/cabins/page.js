export const metadata = {
  title: 'cabins',
}
export default async function Page() {
  // 故意添加如下代码, 增加 server component 'Page' 的渲染时间, 以便观察 loading.js 是否生效
  // await new Promise((resolve, reject) => {
  //   setTimeout(resolve, 3000)
  // });
  return (
    <>
      <h2>cabin page!</h2>
    </>
  );
}
