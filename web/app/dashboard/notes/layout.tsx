"use client";

import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full space-y-8">
      <div className="flex sm:flex-row flex-col gap-3 justify-between items-center">
        <h1 className="sm:text-4xl text-2xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-[200px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div>
          <div className="py-12 flex flex-col justify-center items-center gap-2">
            <Image src="/documents.png" width="200" height="200" alt="docs" />
            <h2 className="text-md mb-2">You have no notes</h2>
            <CreateNoteButton />
          </div>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex gap-12 pb-20">
          <ul className="space-y-2 w-[300px]">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn(
                  "text-base hover:text-cyan-300 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": note._id === noteId,
                  }
                )}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  {note.text.substring(0, 24) + "..."}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-full">{children}</div>
        </div>
      )}
    </main>
  );
}
