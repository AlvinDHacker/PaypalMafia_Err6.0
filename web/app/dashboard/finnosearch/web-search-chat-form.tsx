"use client";

import { Message, useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z.string().min(1).max(250),
});

export function WebSearchChatForm({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) {
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
  }

  return (
    <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
      <div className="h-[350px] overflow-y-auto space-y-3">
        <div className="dark:bg-slate-950 rounded p-3">
          AI: Ask any question using AI about this website below:
        </div>
        {messages?.map((message, i) => (
          <div
            key={i}
            className={cn(
              {
                "dark:bg-slate-800 bg-slate-200": message.role === "user",
                "dark:bg-slate-950 bg-slate-300": message.role === "assistant",
                "text-right": message.role === "user",
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {message.role === "user" ? "YOU" : "AI"}: {message.content}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 gap-2"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field: { onChange, ...fieldProps } }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...fieldProps}
                      onChange={(e) => {
                        handleInputChange(e);
                        onChange(e);
                      }}
                      value={input}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                          setInput("");
                        }
                      }}
                      placeholder="Ask any question over this document"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={form.formState.isSubmitting}
              loadingText="Submitting..."
            >
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
