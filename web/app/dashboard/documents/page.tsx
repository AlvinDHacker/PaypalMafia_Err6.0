"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  const organization = useOrganization();

  const documents = useQuery(api.documents.getDocuments, {
    orgId: organization.organization?.id,
  });

  return (
    <main className="w-full space-y-8">
      <div className="flex sm:flex-row flex-col gap-3 justify-between items-center">
        <h1 className="sm:text-4xl text-2xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card
              key={i}
              className="h-[200px] p-6 flex flex-col justify-between"
            >
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-2">
          <Image src="/documents.png" width="200" height="200" alt="docs" />
          <h2 className="text-md mb-2">You have no documents</h2>
          <CreateDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc, i) => <DocumentCard key={i} document={doc} />)}
        </div>
      )}
    </main>
  );
}
