import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* quality 的值必须在 next.config.mjs 的 images.qualities 数组内, 否则无效, 并输出对应提醒日志: */}
      {/* [browser] Image with src "/logo.png" is using quality "1" which is not configured in images.qualities [75]. Please update your config to [1, 75]. */}
      {/* Read more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" quality={25} /> */}

      {/* 如果指定 prop 'placeholder', 就必须同时指定 blurDataUrl, 否则会 build time error */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" quality={25} placeholder="blur" /> */}
      
      {/* 如果 src 是 string path, nextjs 无法在 buildtime 得知 image 的: */}
      {/* - intrinsic width (prop width)  */}
      {/* - intrinsic height (prop height) */}
      {/* 如果 src 是 static imported 的, 那么 nextjs 可以在 buildtime 得知: */}
      {/* - intrinsic width (prop width)  */}
      {/* - intrinsic height (prop height) */}
      {/* 此时就不需要指定 prop 'width' 和 prop 'height' 了 */}
      {/* 注意: */}
      {/* prop 'width' 和 prop 'height' 应如实指定为 image 的 width 和 height, 这样 nextjs 才能在 buildtime 推断出 aspect ratio */}
      {/* 如果希望调整 image 的 rendered size, 应通过 css 实现, 而非通过 prop 'width' 和 prop 'height' 实现 */}
      <Image src={logo} alt="The Wild Oasis logo" quality={50} style={{width: 60, height: 60}} />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
