import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import { Suspense } from "react";
import Spinner from "./Spinner.js";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        {/* 如果 child component `Navigation` 内有 await 操作, 需要包裹一层 parent component `Suspense`, 否则总是提示 error */}
        <Suspense fallback={<Spinner />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
