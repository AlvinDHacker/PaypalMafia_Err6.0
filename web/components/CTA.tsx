"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

const CTA = () => (
  <section
    className="mx-auto w-[90%] flex flex-col sm:flex-row justify-between items-center 
  dark:hover:bg-black hover:bg-white bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-all duration-200 rounded-[20px] sm:py-12 py-6 sm:px-16 px-6 sm:my-16 my-6 max-w-7xl"
  >
    <div className="flex flex-1 flex-col">
      <h2 className="font-semibold text-3xl sm:text-5xl text-black dark:text-white w-full">
        Let&apos;s try our service now!
      </h2>
      <div className="text-black-300 dark:text-white text-md max-w-[470px] mt-5">
        Anything related to finance at your fingertips...
        <br />
        All you need to do is Ask!
      </div>
    </div>

    <div className="ml-0 sm:ml-10 mt-10 sm:mt-0">
      <Unauthenticated>
        <Button>
          <SignInButton />
        </Button>
      </Unauthenticated>

      <Authenticated>
        <Link href="/dashboard" className="text-sm hover:underline">
          <Button className="gap-3">
            Ask a question <MessageCircleMore />
          </Button>
        </Link>
      </Authenticated>
    </div>
  </section>
);

export default CTA;
