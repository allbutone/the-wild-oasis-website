import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* quality 的值必须在 next.config.mjs 的 images.qualities 范围内, 否则无效, 并输出对应提醒日志: */}
      {/* [browser] Image with src "/logo.png" is using quality "1" which is not configured in images.qualities [75]. Please update your config to [1, 75]. */}
      {/* Read more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities */}
      {/* 如果指定 prop 'placeholder', 就必须同时指定 blurDataUrl, 否则会 build time error */}
      <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" quality={1} />
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" quality={1} placeholder="blur" /> */}
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
