import Link from "next/link";
import SignIn from "./auth/SignIn.js";
import SignOut from "./auth/SignOut.js";
import { auth } from "@/auth.js";
import Image from "next/image.js";

export default async function Navigation() {
  // 获取通过 google oauth 后, 得到的 session 信息
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex flex-row items-center gap-2"
          >
            {/* 实测发现 session.user.image 为: */}
            {/* 'https://lh3.googleusercontent.com/a/ACg8ocLWgCmTwHYIaOxTrdr5kO5gn6Rnx4_JFGm2BfzVC-aQ5qV5Dfxa=s96-c' */}
            {/* 但 Google 的图片服务器为了防止盗链，会检查 Referer 请求头。 */}
            {/* 如果请求是从你的本地域名（如 localhost）发出的，Google 可能会拦截。设置为 no-referrer 可以绕过这个检查 */}
            {session?.user?.image && (
              <img
                alt={session.user.name}
                src={session.user.image}
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
              />
            )}
            <span>Account/Guest area</span>
          </Link>
        </li>
        {session?.user ? (
          <li>
            <SignOut />
          </li>
        ) : (
          <li>
            <SignIn />
          </li>
        )}
      </ul>
    </nav>
  );
}
