// localhost:3000/ 对应 app/page.js 里的 default export component
// localhost:3000/foo 对应 app/foo/page.js 里的 default export component

import Counter from "../_components/Counter";

// localhost:3000/foo/bar 对应 app/foo/bar/page.js 里的 default export component
export default async function Page() {
  // client-side component 要求同步返回 UI, 其内无法直接 await fetch(), 即: 不能因为阻塞等待数据而卡 UI
  // server-side component 则没有这个限制, 可以直接 await fetch(), 只要生成 client side 需要的 HTML 即可
  //
  // 下面借助 JSONPlaceholder - Free Fake REST API 进行测试:
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();

  // 从原理上说: 下面的日志, 只能在 server side console 中看到, 在 client side console 中看不到
  // 但使用 next v16 实测, 发现:
  // 在 client side console 中也可以看到, 但都带了 'server' 前缀
  // 应该是为了开发方便, server side log 被推送给了 client side
  console.log(users);
  return (
    <>
      <h2>cabin page!</h2>

      {/* server component Page 通过 props 将数据传递给 client component Counter */}
      {/* 测试如下: */}
      <Counter users={users} />

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </>
  );
}
