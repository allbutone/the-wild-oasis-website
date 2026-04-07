import Link from "next/link";

export const metadata = {
  // 具体 page 中的 metadata.title 会覆盖"layout 中的 metadata.title";
  title: "root page title",
};

export default function Page() {
  return (
    <>
      <main className="mt-24">
        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    </>
  );
}
