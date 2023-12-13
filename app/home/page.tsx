import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import Link from "next/link";
import { TWITTER_URL } from "@/lib/constants";
import Hero from "./components/hero";
import Feature from "./components/feature";
import Footer from "./components/footer";
import { FaTwitter } from "react-icons/fa6";

const features = [
  {
    title: "San Francisco",
    description:
      "Looking for a safe, flexible place to live in San Francisco? You've found it!",
    images: ["/sf-1.png", "/sf-2.jpeg", "/sf-3.jpeg"],
    imagePosition: "left",
  },
  {
    title: "Palo Alto",
    description:
      "Located just 11 minutes from the Stanford campus by bicycle, this fully furnished Palo Alto home has a beautiful open layout.",
    images: ["/pa-1.png", "/pa-2.jpeg", "/pa-3.jpeg"],
    imagePosition: "right",
  },
  {
    title: "Bakersfield",
    description:
      "This fully furnished Bakersfield home in a great neighborhood has a beautiful open layout with floor to ceiling windows.",
    images: [
      "/bakersfield-1.jpeg",
      "/bakersfield-2.jpeg",
      "/bakersfield-3.jpeg",
    ],
    imagePosition: "left",
  },
  {
    title: "NYC",
    description: "Live in NYC starting at $600/month.",
    images: ["/nyc-1.jpeg", "/nyc-2.jpeg", "/nyc-3.jpeg"],
    imagePosition: "right",
  },
];
export default function HomePage() {
  return (
    <div className="space-b-10 flex h-full cursor-pointer flex-col items-center bg-black text-white">
      <div className="flex flex w-full justify-between px-8 py-6">
        <Image
          width={112}
          height={112}
          src="/brownstone-logo.png"
          alt="brownstone"
          className="mr-20 rounded-xl"
        />
        <div className="flex items-center justify-center">
          <Link className="mr-8 cursor-pointer" href="https://app.brownstonepods.com">
            Go to App
          </Link>
          <Link className="mr-8 cursor-pointer" href="https://blog.brownstonepods.com">
            Blog
          </Link>
          <Link className="mr-8 cursor-pointer" href="mailto:hey@brownstone.live">
            Contact Us
          </Link>
          <Link
            href={TWITTER_URL}
            className=" flex items-center justify-center"
          >
            <FaTwitter className="mr-2" />
            Twitter
          </Link>
        </div>
      </div>
      <Hero />
      {features.map((item: any, i: number) => {
        return <Feature {...item} key={i} />;
      })}
      <Footer />
    </div>
  );
}
