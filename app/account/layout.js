import Link from "next/link";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      {/* <ul className="flex flex-col gap-y-5">
        <li>
          <Link href={"/account"}>Info</Link>
        </li>
        <li>
          <Link href={"/account/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/account/reservations"}>Reservations</Link>
        </li>
      </ul> */}
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
