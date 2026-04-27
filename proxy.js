// 1. 直接将 auth.js 所导出的 function `auth` 作为 middleware 导出
export { auth as proxy } from "./auth.js"; // since Next.js v16: function name 需要被命名为 proxy
// export { auth as middleware } from "./auth.js"; // before Next.js v16: function name 需要被命名为 middleware

// 2. 访问 route '/account' 时会执行 middleware/proxy (由 auth 充当)
// `auth` 在执行时, 会执行 auth.js 中的 callbacks.authorized 并根据其返回值决定"是否授权"
export const config = {
  matcher: ['/account']
}
