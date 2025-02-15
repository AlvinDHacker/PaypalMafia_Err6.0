"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Authenticated } from "convex/react";

const Navbar = () => {
  return (
    <div className="z-10 w-full flex py-2 justify-between items-center navbar relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="flex items-center gap-3 sm:text-2xl text-xl font-bold"
          >
            <Image
              src="/finnovate_logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="logo"
            />
            Finnovate AI
          </Link>

          <nav className="sm:flex hidden items-center gap-8">
            <OrganizationSwitcher />

            <Authenticated>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
            </Authenticated>
          </nav>
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />

          <HeaderActions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
