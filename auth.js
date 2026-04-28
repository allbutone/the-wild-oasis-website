import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server.js";
import { createGuest, getGuest } from "./app/_lib/data-service.js";

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
    authorized({ request, auth }) {
      if (auth) {
        return NextResponse.next(); // 如果认证成功(已登录), 就授权
      } else {
        return false; // 否则(未登录), 就不授权
      }
    },
    // 定义登录规则, 详见:
    // - signIn 的 hover doc
    // - https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn(params) {
      const { user, account, profile } = params;
      /* {
        user: {
          id: '10b5d65a-249a-44d5-a3ed-89a2572afdd7',
          name: 'Silent Night',
          email: 'silentnightsilentnight@gmail.com',
          image: 'https://lh3.googleusercontent.com/a/ACg8ocLWgCmTwHYIaOxTrdr5kO5gn6Rnx4_JFGm2BfzVC-aQ5qV5Dfxa=s96-c'
        },
        account: {
          access_token: '...',
          expires_in: 3597,
          scope: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          token_type: 'bearer',
          id_token: '...',
          expires_at: 1777295829,
          provider: 'google',
          type: 'oidc',
          providerAccountId: '103716164686126018749'
        },
        profile: {
          iss: 'https://accounts.google.com',
          azp: '50735446139-brsol65dvq00qhc2jj106ejsrsf045dk.apps.googleusercontent.com',
          aud: '50735446139-brsol65dvq00qhc2jj106ejsrsf045dk.apps.googleusercontent.com',
          sub: '103716164686126018749',
          email: 'silentnightsilentnight@gmail.com',
          email_verified: true,
          at_hash: 'K2q3vbzjt_9BiSXOOnyPUw',
          name: 'Silent Night',
          picture: 'https://lh3.googleusercontent.com/a/ACg8ocLWgCmTwHYIaOxTrdr5kO5gn6Rnx4_JFGm2BfzVC-aQ5qV5Dfxa=s96-c',
          given_name: 'Silent',
          family_name: 'Night',
          iat: 1777292232,
          exp: 1777295832
        }
      } */
      // console.log(params); // 实测 google oauth 登录得到的 params 如上

      // throw new Error('不允许登录'); //终止认证流程并跳转到 http://localhost:3000/api/auth/error?error=AccessDenied
      // return false; // 终止认证流程并跳转到 http://localhost:3000/api/auth/error?error=AccessDenied
      return true; // 继续认证流程
      // return '/';// 直接跳转到指定页面
    },
    // 在 server side 生成 token, 最终会加密存储到 client side 的 cookie 内
    async jwt(params) {
      const { token, user, account, profile, session, trigger } = params;

      // 根据
      // - 文档 https://next-auth.js.org/configuration/callbacks#jwt-callback
      // - 源码 https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/index.ts -> AuthConfig -> callbacks
      // 可知:
      // - 仅当 trigger 为 signIn / signUp 时, user 有值, 否则无值
      // - method `jwt` 的执行时机为:
      //     - json web token is created (at sign in)
      //       此时 user 有值
      //     - json web token is updated (whenever a session is accessed in the client)
      //       此时 user 无值

      // 下面需要用到 user.email, 为确保 user 有值(否则报错)
      // 需要借助 if 检查如下:
      if (user) {
        let targetGuest = await getGuest(user.email);
        if (!targetGuest) {
          targetGuest = await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        // 为 token 添加 custom property 'guestId'
        token.guestId = targetGuest.id;
      }
      return token;
    },
    // 在 server side 将 token 中的内容选择性地暴露给 session, 以便 client side 能够使用
    session(params) {
      const { session, token, user, property } = params;
      session.user.guestId = token.guestId;
      return session;
    },
  },
  // 指定 custom signIn/signOut/error page
  pages: {
    //使用 route '/login' 对应的 page 作为 login page
    signIn: "/login", //defaults to '/signin', 参考源码: core/src/index.ts -> interface PagesOptions
  },
});
