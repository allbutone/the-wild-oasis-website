// 创建 route '/api/cabin/[cabinId]' 对应的 API
// 注意: route folder 下不可以同时定义 page.js 和 route.js
// 具体参考: https://nextjs.org/docs/app/api-reference/file-conventions/route

import { getBookedDatesByCabinId, getCabin } from "../../../_lib/data-service";

//function name 对应 http verb
//function 必须 export, 否则无法生效
export async function GET(request, { params }) {
  const { cabinId } = await params;
  // const cabin = await getCabin(cabinId);
  // const bookedDates = await getBookedDatesByCabinId(cabinId);
  // 优化如下:
  const [cabin, bookedDates] = await Promise.all([
    await getCabin(cabinId),
    await getBookedDatesByCabinId(cabinId),
  ]);
  return Response.json({
    cabin, // 指定房间
    bookedDates, // 指定房间已经被预订的 dates
  });
}
