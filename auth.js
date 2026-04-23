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
    authorized({auth, request}){
      console.log('auth -> ', auth); // 其实 auth 就是 await auth 所返回的值: session
      if(auth){// 如果认证通过, 就授权通过
        return NextResponse.next(); // 表示 continue routing to target route
      }else{
        // return NextResponse.redirect('/login', request.url); // 如果定义了 custom login page
        // 如果未定义 custom login page, 就直接 return false, 这样 next.js 会
        // GET http://localhost:3000/api/auth/signin?callbackUrl={被拦截的URL}
        // 重定向到 next.js 默认的 login page
        return false; 
      }
    }
  }
});
