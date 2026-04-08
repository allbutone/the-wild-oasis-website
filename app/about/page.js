import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import Image from "next/image";

export const metadata = {
  title: "about",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* 
      如果 image src 是 static/dynamic imported 的:
        - 那么仅使用 prop placeholder 即可进行占位, 因为 buildtime 可以确定 width 和 height
          可以生成对应尺寸的占位图
      如果 image src 是 string path:
        - 仅使用 prop placeholder 是无法进行占位的, 因为 width 和 height 是 runtime 才能确定的
          无法在 buildtime 生成对应的展位图, 只能由开发者自己通过 prop 'blurDataUrl' 指定对应的展位图 
      */}
      <div className="col-span-2">
        <Image
          src={about1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
        />
      </div>

      {/* 防止 layout shift 策略一: Image 根据自身 width 和 height 进行占位 */}
      {/* 此时 nextjs 会在 build time 自动 infer 出图片的 width 和 height */}
      {/* <div className="col-span-2">
        <Image src={about2} alt="Family that manages The Wild Oasis" />
      </div> */}

      {/* 防止 layout shift 策略二: Image 自己不占位, 让所在 parent 进行占位 */}
      {/* parent 需要指定自己的 width 和 height, 由于 col-span-2 已经指定了 width */}
      {/* 因此需要通过 aspect-square 指定等值的 height, 否则 height 为 0, 其内的 image 不展示 */}
      <div className="col-span-2 relative aspect-square">
        <Image
          src={"/about-2.jpg"}
          fill
          className="object-cover"
          // placeholder="blur"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
