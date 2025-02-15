import {
  MutationCtx,
  QueryCtx,
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import OpenAI from "openai";
import { Id } from "./_generated/dataModel";
import { embed } from "./notes";
import * as xlsx from "xlsx";
import Tesseract from "tesseract.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to extract text based on file type
export async function extractTextFromFile(
  file: ArrayBuffer,
  fileType: string
): Promise<string> {
  switch (fileType.toLowerCase()) {
    case "application/pdf":
      return await extractFromPDF(file);
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      return await extractFromExcel(file);
    case "text/csv":
      return await extractFromCSV(file);
    case "image/jpeg":
    case "image/png":
    case "image/jpg":
      return await extractFromImage(file);
    case "text/plain":
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return Buffer.from(file).toString("utf-8");
    default:
      throw new ConvexError(`Unsupported file type: ${fileType}`);
  }
}

// PDF extraction
async function extractFromPDF(file: ArrayBuffer): Promise<string> {
  try {
    // Convert ArrayBuffer to string and look for text patterns
    const textDecoder = new TextDecoder("utf-8");
    const rawText = textDecoder.decode(file);

    // Very basic text extraction - find text between parentheses
    // This is extremely simplistic but may extract some basic content
    const textMatches = rawText.match(/\((.*?)\)/g) || [];
    const extractedText = textMatches
      .map((match) => match.slice(1, -1))
      .filter((text) => /^[\x20-\x7E]+$/.test(text)) // Keep only printable ASCII
      .join(" ");

    return extractedText || "Could not extract meaningful text from this PDF.";
  } catch (error) {
    console.error("Error in basic PDF text extraction:", error);
    return "Error: Could not process this PDF file.";
  }
}

// Excel extraction
async function extractFromExcel(file: ArrayBuffer): Promise<string> {
  const workbook = xlsx.read(file, { type: "array" });
  let text = "";

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    text += `Sheet: ${sheetName}\n`;
    sheetData.forEach((row: any) => {
      if (Array.isArray(row)) {
        text += row.join(" ") + "\n";
      }
    });
  });

  return text;
}

// CSV extraction using xlsx (since it can handle CSV too)
async function extractFromCSV(file: ArrayBuffer): Promise<string> {
  try {
    const buffer = Buffer.from(file);
    // Use XLSX to parse CSV - it's more stable in serverless environments
    const workbook = xlsx.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });

    let text = "";
    data.forEach((row: any) => {
      if (Array.isArray(row)) {
        text += row.join(" ") + "\n";
      }
    });

    return text;
  } catch (error) {
    console.error("Error extracting CSV text:", error);
    return "Error: Could not extract text from CSV file.";
  }
}

// Image extraction using Tesseract
async function extractFromImage(file: ArrayBuffer): Promise<string> {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(Buffer.from(file), "eng", {
      logger: (m) => console.log(m),
    });
    return text;
  } catch (error) {
    console.error("Error extracting image text:", error);
    return "Error: Could not extract text from image file.";
  }
}

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(documentId);

  if (!document) {
    return null;
  }

  if (document.orgId) {
    const hasAccess = await hasOrgAccess(ctx, document.orgId);

    if (!hasAccess) {
      return null;
    }
  } else {
    if (document.tokenIdentifier !== userId) {
      return null;
    }
  }

  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const hasOrgAccess = async (
  ctx: MutationCtx | QueryCtx,
  orgId: string
) => {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return false;
  }

  const membership = await ctx.db
    .query("memberships")
    .withIndex("by_orgId_userId", (q) =>
      q.eq("orgId", orgId).eq("userId", userId)
    )
    .first();

  return !!membership;
};

export const getDocuments = query({
  args: {
    orgId: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return undefined;
    }

    if (args.orgId) {
      const isMember = await hasOrgAccess(ctx, args.orgId);
      if (!isMember) {
        return undefined;
      }

      return await ctx.db
        .query("documents")
        .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
        .collect();
    } else {
      return await ctx.db
        .query("documents")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .collect();
    }
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      return null;
    }

    return {
      ...accessObj.document,
      documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
    };
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
    orgId: v.optional(v.string()),
    fileType: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    let documentId: Id<"documents">;

    if (args.orgId) {
      const isMember = await hasOrgAccess(ctx, args.orgId);
      if (!isMember) {
        throw new ConvexError("You do not have access to this organization");
      }

      documentId = await ctx.db.insert("documents", {
        title: args.title,
        fileId: args.fileId,
        description: "",
        orgId: args.orgId,
        fileType: args.fileType,
        extractedText: "",
      });
    } else {
      documentId = await ctx.db.insert("documents", {
        title: args.title,
        tokenIdentifier: userId,
        fileId: args.fileId,
        description: "",
        fileType: args.fileType,
        extractedText: "",
      });
    }

    await ctx.scheduler.runAfter(
      0,
      internal.documents.generateDocumentDescription,
      {
        fileId: args.fileId,
        documentId,
        fileType: args.fileType,
      }
    );
  },
});

export const generateDocumentDescription = internalAction({
  args: {
    fileId: v.id("_storage"),
    documentId: v.id("documents"),
    fileType: v.string(),
  },
  async handler(ctx, args) {
    const file = await ctx.storage.get(args.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    try {
      const fileBuffer = await file.arrayBuffer();
      const extractedText = await extractTextFromFile(
        fileBuffer,
        args.fileType
      );

      // Truncate text if it's too long for the API call
      const MAX_CHARS = 4000;
      const truncatedText =
        extractedText.length > MAX_CHARS
          ? extractedText.substring(0, MAX_CHARS) + "... (truncated)"
          : extractedText;

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Generate a one-sentence description for this document: "${truncatedText}"`,
          },
          {
            role: "user",
            content: `Please write a concise, informative description in one sentence.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const description =
        chatCompletion.choices[0].message.content ??
        "Could not generate description for this document";

      const embedding = await embed(description);

      await ctx.runMutation(internal.documents.updateDocumentDescription, {
        documentId: args.documentId,
        description: description,
        embedding,
        extractedText,
      });
    } catch (error) {
      console.error("Error in generateDocumentDescription:", error);

      // Update with error message but still save what we can
      await ctx.runMutation(internal.documents.updateDocumentDescription, {
        documentId: args.documentId,
        description: "Error processing document",
        embedding: [],
        extractedText: "Error: Could not extract text from this document.",
      });
    }
  },
});

export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
    embedding: v.array(v.float64()),
    extractedText: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.documentId, {
      description: args.description,
      embedding: args.embedding,
      extractedText: args.extractedText,
    });
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      {
        documentId: args.documentId,
      }
    );

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    // Instead of loading the file, use the extracted text we stored
    const document = accessObj.document;
    if (!document.extractedText) {
      throw new ConvexError("Document text has not been extracted yet");
    }

    // Function to estimate token count (very rough estimate)
    const estimateTokens = (text: string) => {
      return Math.ceil(text.length / 4); // Rough estimate: 4 chars per token
    };

    const MAX_TOKENS = 8000;
    let textToProcess = document.extractedText;

    // If text is too long, truncate it with a note
    if (estimateTokens(textToProcess) > MAX_TOKENS) {
      const truncatedText = textToProcess.substring(0, MAX_TOKENS * 4);
      textToProcess =
        truncatedText +
        "\n\n[Note: Document was truncated due to length limitations]";
    }

    try {
      const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
        await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `You are an assistant that answers questions about documents. Answer based on this document text: ${textToProcess}`,
            },
            {
              role: "user",
              content: args.question,
            },
          ],
          model: "gpt-4o",
          max_tokens: 1000,
        });

      await ctx.runMutation(internal.chats.createChatRecord, {
        documentId: args.documentId,
        text: args.question,
        isHuman: true,
        tokenIdentifier: accessObj.userId,
      });

      const response =
        chatCompletion.choices[0].message.content ??
        "Could not generate a response. The document may be too large to process completely.";

      await ctx.runMutation(internal.chats.createChatRecord, {
        documentId: args.documentId,
        text: response,
        isHuman: false,
        tokenIdentifier: accessObj.userId,
      });

      return response;
    } catch (error: any) {
      // Handle API errors gracefully
      console.error("Error in askQuestion:", error);

      const errorMessage =
        error.message || "An error occurred while processing your question";
      await ctx.runMutation(internal.chats.createChatRecord, {
        documentId: args.documentId,
        text: errorMessage,
        isHuman: false,
        tokenIdentifier: accessObj.userId,
      });

      throw new ConvexError(errorMessage);
    }
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    await ctx.storage.delete(accessObj.document.fileId);
    await ctx.db.delete(args.documentId);
  },
});
