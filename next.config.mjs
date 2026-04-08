/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
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
  },
};

export default nextConfig;
