import { WebSearchChatForm } from "../web-search-chat-form";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { auth } from "@clerk/nextjs/server";

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

const Page = async ({
  params,
}: {
  params: Promise<{ url: string | string[] }>;
}) => {
  const { url } = await params;
  const { userId } = await auth();
  const reconstructedUrl = reconstructUrl({ url: url as string[] });

  const sessionId = (reconstructedUrl + "--" + userId).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const initialMessages = await ragChat.history.getMessages({
    amount: 100,
    sessionId,
  });

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }
  return (
    <WebSearchChatForm
      sessionId={sessionId}
      initialMessages={initialMessages}
    />
  );
};

export default Page;
