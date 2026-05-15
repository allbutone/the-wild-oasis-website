import DateSelector from "@/app/_components/DateSelector.js";
import ReservationForm from "@/app/_components/ReservationForm.js";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service.js";
import { auth } from "@/auth.js";
import LoginMessage from "./auth/LoginMessage.js";

// 该组件是一个 server component, 负责加载数据, 给所 return 的 client component 使用
export default async function Reservation({ cabin }) {
  // 第一种加载方式: 不推荐, 等待时间 = 每个查询所需时间之和
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabin.id);
  // 第二种加载方式: 推荐, 等待时间 = 最耗时的查询所需的时间
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  // 获取 google oauth 认证后的 session info
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      {/* 需要用到 settings 中的信息: minBookingLength(最小预定天数) / maxBookingLength(最大预订天数) */}
      {/* 需要用到 cabin 中的信息: regularPrice(价格) / discount(折扣额) */}
      {/* bookedDates: cabin 已经被预订的 dates (这些 dates 不允许 user 再预订) */}
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {/* 需要用到 cabin 中的信息: maxCapacity(cabin 最多容纳多少人) */}
      {session?.user ? (
        <ReservationForm cabin={cabin} currentUser={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
