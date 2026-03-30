import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      {/* nextjs 中的 component 默认都是 server component */}
      {/* 如果使用 anchor tag 的话, 在click的时候会导致 hard reload */}
      {/* <li><a href="/">Home</a></li> */}
      {/* <li><a href="/about">About</a></li> */}
      {/* <li><a href="/account">Account</a></li> */}
      {/* <li><a href="/cabins">Cabins</a></li> */}

      {/* 使用 nextjs 提供的 <Link /> 即可解决 hard reload 的问题 */}
      {/* 注意: nextjs 的 <Link /> 需要配置 prop 'href' */}
      {/* 而 react router 的 <Link /> 需要配置 prop 'to' */}
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/account">Account</Link>
      </li>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
    </ul>
  );
}
