import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import ChatBox from "../ChatBox";
import { Chatbot } from "../Chat";
import Link from "next/link";
import { TWITTER_URL } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-b-10 flex h-screen flex-col items-center bg-zinc-900 text-white">
      <div className="flex flex w-full justify-between px-8 py-6">
        <Image
          width={112}
          height={112}
          src="/brownstone-logo.png"
          alt="brownstone"
          className="mr-20 rounded-xl"
        />
        <div className="flex">
          <Link className="mr-8" href="https://app.brownstonepods.com">
            Go to App
          </Link>
          <Link className="mr-8" href="https://blog.brownstonepods.com">
            Blog
          </Link>
          <Link className="mr-8" href="/contact">
            Contact Us
          </Link>
          <Link href={TWITTER_URL}>Twitter</Link>
        </div>
      </div>
      <div className="pt-16">
        <Image
          width={512}
          height={512}
          src="/brownstone-logo.png"
          alt="brownstone"
          className="mb-16 w-48 rounded-xl"
        />
        <h1 className="my-18 text-5xl text-white">brownstone pods coliving</h1>
      </div>
    </div>
  );
}
