// 1. 直接将 auth.js 所导出的 function `auth` 作为 middleware 导出
export { auth as proxy } from "./auth.js"; // since Next.js v16: function name 需要被命名为 proxy
// export { auth as middleware } from "./auth.js"; // before Next.js v16: function name 需要被命名为 middleware

// 2. middleware/proxy `auth` 在执行时, 会先获取 session, 然后:
//    - 如果 nextConfig.callbacks 内定义了 function `authorized`
//      就执行 `authorized({auth, request})` 并根据返回值判断是否授权:
//      - 返回 true 表示授权通过
//      - 返回 false 表示授权不通过
//    - 如果 nextConfig.callbacks 内未定义 function `authorized`:
//      就根据获取到的 session 进行判断:
//      - session 有值, 表示 user 已经认证/已登录, 授权通过
//      - session 没值, 表示 user 未经认证/未登录, 授权不通过(跳转到 login 界面)
export const config = {
  matcher: ['/account']
}
