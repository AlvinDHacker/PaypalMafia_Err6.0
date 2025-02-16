"use client";

import { DockIcon, Docks } from "@/components/ui/dock";
import { cn } from "@/lib/utils";
import { BarChart2, ClipboardPen, Files, Search, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="sm:block hidden space-y-6">
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/search"),
              }
            )}
            href="/dashboard/search"
          >
            <Search />
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/documents"),
              }
            )}
            href="/dashboard/documents"
          >
            <Files />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/websearch"),
              }
            )}
            href="/dashboard/websearch"
          >
            <Globe />
            WebSearch
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/notes"),
              }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/analytics"),
              }
            )}
            href="/dashboard/analytics"
          >
            <BarChart2 />
            Analytics
          </Link>
        </li>
      </ul>
      <div className="sm:hidden flex justify-center fixed w-[80%] ml-1.5 bottom-0">
        <Docks
          className="z-20 rounded-t-xl bg-white dark:bg-black shadow-md shadow-second"
          direction="middle"
        >
          <DockIcon>
            <Link href={"/dashboard/search"}>
              <Search
                className={cn("size-6 text-second", {
                  "text-green-600": pathname.endsWith("/search"),
                })}
              />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href={"/dashboard/documents"}>
              <Files
                className={cn("size-6 text-second", {
                  "text-green-600": pathname.endsWith("/documents"),
                })}
              />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href={"/dashboard/websearch"}>
              <Globe
                className={cn("size-6 text-second", {
                  "text-green-600": pathname.endsWith("/websearch"),
                })}
              />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href={"/dashboard/notes"}>
              <ClipboardPen
                className={cn("size-6 text-second", {
                  "text-green-600": pathname.endsWith("/notes"),
                })}
              />
            </Link>
          </DockIcon>
          <DockIcon>
            <Link href={"/dashboard/analytics"}>
              <BarChart2
                className={cn("size-6 text-second", {
                  "text-green-600": pathname.endsWith("/analytics"),
                })}
              />
            </Link>
          </DockIcon>
        </Docks>
      </div>
      {/* <div className="fixed w-full bottom-0">
        <div className="flex w-[70%] mx-auto bg-green-500 p-3 justify-between sm:hidden">
          <div>
            <Search />
          </div>
          <div>
            <Files />
          </div>
          <div>
            <ClipboardPen />
          </div>
          <div>
            <BarChart2 />
          </div>
        </div>
      </div> */}
    </nav>
  );
}
