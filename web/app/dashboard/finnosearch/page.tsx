"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { FileIcon, NotebookPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import WebSearch from "./web-search";

export default function FinnoSearch() {
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">FinnoSearch</h1>
      </div>
      <Tabs defaultValue="web" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="web">Website</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <TabsContent value="web">
          <WebSearch />
        </TabsContent>
        <TabsContent value="video">Hello</TabsContent>
      </Tabs>
    </main>
  );
}
