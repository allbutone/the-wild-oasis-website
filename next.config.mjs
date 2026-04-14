/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static export
  output: 'export',

  images: {
    // Image 需要 server side API 的支持, 因此, 如果使用 SSG 的话, 就得:
    //
    // 方式一: disable image optimization
    unoptimized: true,
    //
    // 方式二: 使用第三方 image optimiazation service, 例如 cloudinary
    // 参考: https://nextjs.org/docs/pages/guides/static-exports#image-optimization
    // loader: 'custom', // sevice name
    // loaderFile: './my-loader.ts', // how to load service 'custom'
  }
  /* images: {
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
  }, */
};

export default nextConfig;
