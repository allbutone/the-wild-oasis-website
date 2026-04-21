"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// filter cabins 是 client side 行为
export default function FilterByCapacity() {
  // read current search params
  const searchParams = useSearchParams();

  const currentCapacityType = searchParams.get('capacityType') ?? 'all';

  // 注意: nextjs 有两个 useRouter, 在 next/navigation 下的才是 app router, 另一个是 page router
  const router = useRouter();
  // read current URI
  const pathname = usePathname(); // 有 '/' 前缀

  function handleClick(capacityType) {
    console.log(capacityType);
    //1. create new search params based opon current search params
    const newSearchParams = new URLSearchParams(searchParams);
    //2. 将 user 选择的 capacityType 添加到 new search params
    newSearchParams.set("capacityType", capacityType);
    //3. 借助 nextjs 的 app router 执行 navigation (imperative alternative of what <Link> does)
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });// scroll 默认为 true, 表示 navigation 结束后, 自动 scroll to top of the page
  }
  return (
    <div className="flex border border-primary-800 ">
      <Button onClick={() => handleClick("all")} isActive={currentCapacityType === 'all'}>All cabins</Button>
      <Button onClick={() => handleClick("small")} isActive={currentCapacityType === 'small'}>1&mdash;3</Button>
      <Button onClick={() => handleClick("medium")} isActive={currentCapacityType === 'medium'}>4&mdash;8</Button>
      <Button onClick={() => handleClick("large")} isActive={currentCapacityType === 'large'}>9&mdash;12</Button>
    </div>
  );
}

export function Button({ children, onClick, isActive }) {
  return (
    <button className={ `px-5 py-2 hover:bg-primary-700 ${isActive ? 'bg-primary-700' : ''}` } onClick={onClick}>
      {children}
    </button>
  );
}
