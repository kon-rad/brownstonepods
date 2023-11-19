import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import ChatBox from "../ChatBox";
import { Chatbot } from "../Chat";

export default function HomePage() {
  return (
    <div className="space-b-10 flex h-screen flex-col items-center bg-zinc-900 pt-16 text-white">
      <Image
        width={512}
        height={512}
        src="/brownstone-logo.png"
        alt="brownstone"
        className="mb-16 w-48 rounded-xl"
      />
      <h1 className="text-white">brownstone pods coliving</h1>
      <Chatbot />
      {/* <ChatBox /> */}
    </div>
  );
}
