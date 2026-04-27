import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server.js";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // 定义授权规则, 当 auth 被用作 nextjs middleware/proxy 时
    // 会执行 authorized 并根据其返回值决定是否授权
    //
    // 参考源码: packages/next-auth/src/lib/index.ts -> interface `NextAuthConfig` 可知参数如下:
    // @param request: the request to be authorized, 类型为 NextRequest (from nextjs "next/server"), 是对 native Request 的扩展
    // @param auth: the authenticated user or token, 类型为 Session (from nextauth "@auth/core/types")
    authorized({request, auth}){
      if(auth){
        return NextResponse.next(); // 如果认证成功(已登录), 就授权
      }else{
        return false; // 否则(未登录), 就不授权
      }
    }
  },
  // 指定 custom signIn/signOut/error page
  pages: {
    //使用 route '/login' 对应的 page 作为 login page
    signIn: '/login', //defaults to '/signin', 参考源码: core/src/index.ts -> interface PagesOptions
  }
});
