/** @type {import('next').NextConfig} */
const nextConfig = {
  // key 'output' 支持的值:
  // - undefined: 
  //    The default build output, `.next` directory, that works with 
  //    production mode `next start` or a hosting provider like Vercel
  //    此时: 适合 SSR (next start), 需要 node-runtime / edge runtime 作为 nextjs 的 runtime
  // - 'standalone': 
  //    A standalone build output, `.next/standalone` directory, that 
  //    only includes necessary files/dependencies. Useful for self-hosting in a Docker container.
  //    此时: 适合 Docker, 为降低 image size, 会尽可能剔除不需要的 node module
  // - 'export': 
  //    An exported build output, `out` directory, that only includes static HTML/CSS/JS. 
  //    Useful for self-hosting without a Node.js server.
  //    此时: 适合 SSG, 需要托管在 github pages / nginx / amazon S3 bucket ... 这类静态环境中
  //    此时如果执行 npm run start (next start), 会报错: 
  //    "next start" does not work with "output: export" configuration. Use "npx serve@latest out" instead."
  //    这是因为 `next start` 需要搭配 `output: undefined`, 而非 `output: 'export'`
  //    
  // output: 'export', // for SSG
  output: undefined, // for SSR

  images: {
    // Image 需要 server side API 的支持, 因此, 如果使用 SSG 的话, 就得:
    //
    // 方式一: disable image optimization
    // unoptimized: true,// for SSG
    //
    // 方式二: 使用第三方 image optimiazation service, 例如 cloudinary
    // 参考: https://nextjs.org/docs/pages/guides/static-exports#image-optimization
    // loader: 'custom', // sevice name
    // loaderFile: './my-loader.ts', // how to load service 'custom'

    qualities: [25, 50, 75, 100],
    remotePatterns: [
      // public url
      {
        protocol: "https",
        hostname: "zzudlfaityyrmtxwajxy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      // signed url
      {
        protocol: "https",
        hostname: "zzudlfaityyrmtxwajxy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  }
};

export default nextConfig;
