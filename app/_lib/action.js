"use server";

import { auth, signIn, signOut } from "@/auth.js";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service.js";
import { refresh, revalidatePath, updateTag } from "next/cache.js";
import { differenceInDays } from "date-fns";
import { redirect, RedirectType } from 'next/navigation'

export async function createBookingAction(currentUser, cabin, range, formData){
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);
  const newBooking = {
    startDate: range.from,
    endDate: range.to,
    numNights,
    numGuests: Number(formData.get('numGuests')), 
    cabinPrice,
    extrasPrice: 0,
    totalPrice: cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: formData.get('observations'), 
    guestId: currentUser.guestId,
    cabinId: cabin.id,
  };
  // console.log(newBooking);

  const createdBooking = await createBooking(newBooking);
  // 预订成功后: 
  // 1. cabin 的 bookedDates 必然发生变化
  // 需要刷新如下, 才可让 current route 加载 latest bookedDates
  // 否则 createdBooking 对应的 range 在界面仍然可选(没有 disable)
  revalidatePath(`/cabins/${cabin.id}`);
  // 2. 跳转到 reservation list page
  redirect('/account/reservations');

  // return createdBooking;
}

// server action 充当 useActionState(reducerAction, initialState) 中的 reducerAction 时
// server action 的实参列表会变成: (previousBooking, formData)
export async function updateBookingAction(previousBooking, formData) {
  const session = await auth();
  // 权限检查
  if (!session.user)
    throw new Error("you must be logged in to perform this action!!");

  // 参数检查: 只能更新自己的 booking
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((b) => b.id);

  const targetBookingId = formData.get("bookingId");
  if (!bookingIds.includes(Number(targetBookingId)))
    throw new Error("you are not allowed to update this booking!!");

  const updatedBooking = await updateBooking(targetBookingId, {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  });

  // 将 server action 执行成功与否的 flag 'success' 合并到 `updatedBooking` 中
  // 以便可以根据 updatedBooking.success 在 effect 中按需 redirect
  /* return {
    ...updatedBooking,
    success: true
  }; */
  console.log(`setting update flat 'success' to true`);
  updatedBooking.success = true;
  return updatedBooking;
}

export async function deleteBookingAction(formData) {
  const session = await auth();
  // 权限检查
  if (!session.user)
    throw new Error("you must be logged in to perform this action!!");
  // 参数检查
  const guestBookings = await getBookings(session.user.guestId); // 查询 user 拥有的 bookings
  const guestBookingIds = guestBookings.map((b) => b.id);

  const id = Number(formData.get("bookingId"));
  if (!guestBookingIds.includes(id))
    throw new Error("you are not allowed to delete this booking!");

  await deleteBooking(id);

  // server action 不会自动刷新 current route, 只能:
  // 方式一: client request new RSC payload from server
  // refresh(); // 适合: current route 范围内未使用 'use cache'
  // 方式二: invalidate route cache + client request new RSC payload from server
  revalidatePath('/account/reservations'); // current route 范围内无论是否使用了 'use cache' 都适用
}

export async function signInAction() {
  // 登录成功后, 重定向到 /account
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // 登出成功后, 重定向到 /
  await signOut({ redirectTo: "/" });
}

// react 重写了 form 的行为:
// 当 prop 'action' 的值为 function 时, 其唯一实参为 formData
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

  // server action 不会自动刷新 current route, 只能:
  // 方式一: client request new RSC payload from server
  // refresh(); // 适合: current route 范围内未使用 'use cache'
  // 方式二: invalidate route cache + client request new RSC payload from server
  revalidatePath('/account/profile'); // current route 范围内无论是否使用了 'use cache' 都适用
}
