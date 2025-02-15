"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoadingButton } from "@/components/loading-button";
import { Id } from "@/convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.custom<File>()
    .refine((file) => file instanceof File, "Please select a file")
    .refine(
      (file) => {
        const allowedTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv',
          'image/jpeg',
          'image/png',
          'image/jpg',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        // Check both file.type and file.name extension
        const fileExtension = file.name.toLowerCase().split('.').pop();
        const extensionMap: { [key: string]: string[] } = {
          'pdf': ['application/pdf'],
          'xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
          'xls': ['application/vnd.ms-excel'],
          'csv': ['text/csv'],
          'jpg': ['image/jpeg', 'image/jpg'],
          'jpeg': ['image/jpeg', 'image/jpg'],
          'png': ['image/png'],
          'txt': ['text/plain'],
          'doc': ['application/msword'],
          'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        };
        
        return allowedTypes.includes(file.type) || 
               (fileExtension && extensionMap[fileExtension]?.some(type => allowedTypes.includes(type)));
      },
      {
        message: 'Unsupported file type. Please upload PDF, Excel, CSV, Image, or Text files.',
      }
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
      {
        message: 'File size must be less than 10MB',
      }
    ),
});

export default function UploadDocumentForm({
  onUpload,
}: {
  onUpload: () => void;
}) {
  const organization = useOrganization();
  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setUploadError(null);
      const url = await generateUploadUrl();

      // Determine content type based on file extension if needed
      const file = values.file;
      let contentType = file.type;
      if (!contentType || contentType === 'application/octet-stream') {
        const extension = file.name.toLowerCase().split('.').pop();
        const mimeTypes: { [key: string]: string } = {
          'pdf': 'application/pdf',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'xls': 'application/vnd.ms-excel',
          'csv': 'text/csv',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'txt': 'text/plain',
          'doc': 'application/msword',
          'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        };
        contentType = extension ? mimeTypes[extension] || file.type : file.type;
      }

      const result = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": contentType,
          "Content-Length": file.size.toString()
        },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.statusText}`);
      }

      const { storageId } = await result.json();
      
      await createDocument({
        title: values.title || values.file.name, // Use filename if no title provided
        fileId: storageId as Id<"_storage">,
        orgId: organization.organization?.id,
        fileType: contentType,
      });

      onUpload();
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error instanceof Error ? error.message : "Failed to upload file");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense Report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.txt,.doc,.docx"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {uploadError && (
          <div className="text-red-500 text-sm mt-2">{uploadError}</div>
        )}
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Uploading..."
        >
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
}