import { useRouter } from "next/router";
import UserDropdown from "../tailwindEx/UserDropdown";

export default function HeaderView() {
  const router = useRouter();
  const title = router.pathname === "/" ? "Dashboard" : router.pathname.split("/")[1];
  return (
    <>
      <nav className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent p-4 md:flex-row md:flex-nowrap md:justify-start">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
          <span className="hidden text-sm font-semibold uppercase text-white lg:inline-block">
            {title}
          </span>
          <div className="hidden list-none flex-col items-center md:flex md:flex-row">
            <UserDropdown />
          </div>
        </div>
      </nav>
    </>
  );
}
