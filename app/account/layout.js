import { Suspense } from "react";
import SideNavigation from "../_components/SideNavigation.js";
import Spinner from "../_components/Spinner.js";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <Suspense fallback={<Spinner />}>
        <SideNavigation />
      </Suspense>
      <div>{children}</div>
    </div>
  );
}
