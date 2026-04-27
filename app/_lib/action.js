'use server';

import { signIn, signOut } from "@/auth.js";

export async function signInAction(){
  // 登录成功后, 重定向到 /account
  await signIn('google', {redirectTo: '/account'});
}

export async function signOutAction(){
  // 登出成功后, 重定向到 /
  await signOut({redirectTo: '/'});
}
