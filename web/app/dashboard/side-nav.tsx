"use client";

import { cn } from "@/lib/utils";
import { BarChart2, ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-cyan-300": pathname.endsWith("/search"),
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
                "text-cyan-300": pathname.endsWith("/documents"),
              }
            )}
            href="/dashboard/documents"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex flex-row gap-3 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-cyan-300": pathname.endsWith("/notes"),
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
                "text-cyan-300": pathname.endsWith("/analytics"),
              }
            )}
            href="/dashboard/analytics"
          >
            <BarChart2 />
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
