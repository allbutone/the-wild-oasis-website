"use server";

import { auth, signIn, signOut } from "@/auth.js";
import { deleteBooking, getBookings, updateGuest } from "./data-service.js";
import { revalidatePath } from "next/cache.js";

export async function deleteBookingAction(bookingId) {
  const session = await auth();
  // 权限检查
  if (!session.user)
    throw new Error("you must be logged in to perform this action!!");
  // 参数检查
  const guestBookings = await getBookings(session.user.guestId); // 查询 user 拥有的 bookings
  const guestBookingIds = guestBookings.map((b) => b.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("you are not allowed to delete this booking!");

  await deleteBooking(bookingId);

  revalidatePath('/account/reservations');
}

export async function signInAction() {
  // 登录成功后, 重定向到 /account
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // 登出成功后, 重定向到 /
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();

  console.log(`updateProfileAction args:`, formData);
  // 会输出 FormData instance 如下:
  // {
  //   '$ACTION_ID_400aa567090cb6a3c35a67ccf768c21c56c2d18170': '',
  //   nationality: 'Albania%https://flagcdn.com/al.svg',
  //   nationalID: '121323131'
  // }

  // 使用 server action 需要注意的事情:
  // 1. 是否 authorized to call server action
  if (!session.user)
    throw new Error("you must be logged in to perform this action!!");

  // 2. user inputs 都是不可信的, 需要在 server action 内进行校验
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    // 报错会直接被 nearest ErrorBoundary 捕获
    throw new Error(
      "nationID is not valid, should be alphanumeric with length between 6 and 12!",
    );
  }

  const [nationality, countryFlag] = formData.get("nationality").split("%"); // 不能直接 formData.nationality
  await updateGuest(session.user.guestId, {
    nationalID,
    nationality,
    countryFlag,
  });

  // 上述 update logic 成功后, 由于 client side router cache 的缘故, 导致 UI 没有同步更新
  // 为此需要手动更新缓存如下:
  revalidatePath("/account/profile");
}
