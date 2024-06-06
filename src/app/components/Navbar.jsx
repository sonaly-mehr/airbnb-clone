import React from "react";
import UserNav from "./UserNav";
import Link from "next/link";
import Image from "next/image";
import { SearchModalCompnent } from "./SearchModalComponent";

const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src="/airbnb-desktop.png"
            alt="Desktop Logo"
            width={128}
            height={100}
            className="w-32 h-auto hidden lg:block"
          />

          <Image
            src="/airbnb-mobile.webp"
            alt="Mobile Logo"
            width={48}
            height={48}
            className="block lg:hidden w-12 h-auto"
          />
        </Link>

        {/* <div className="hidden lg:block"> */}
        <SearchModalCompnent />
        {/* </div> */}

        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
