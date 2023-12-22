"use client";

import React, { useContext } from "react";

import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
} from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { IoBook } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";

const externalLinks = [
  {
    name: "Apply to NYC location",
    href: "https://brownstone.nyc/",
    icon: <FaCity width={18} />,
  },
  {
    name: "Locations",
    href: "https://brownstone.live/",
    icon: <FaMap width={18} />,
  },
  {
    name: "Buy a Pod",
    href: "https://brownstone.live/sales",
    icon: <IoIosBed width={18} />,
  },
];

export default function Nav({
  children,
  isOwner,
  isMember,
}: {
  children: ReactNode;
  isOwner: boolean;
  isMember: boolean;
}) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };
  const [siteId, setSiteId] = useState<string | null>();

  console.log("nav isOwner: ", isOwner);

  const OWNER_SITE_LINKS = [
    {
      name: "Back to All Locations",
      href: "/sites",
      icon: <ArrowLeft width={18} />,
    },
    {
      name: "Homepage",
      href: `/site/${id}`,
      isActive: segments.length === 2,
      icon: <Newspaper width={18} />,
    },
    {
      name: "Home Settings",
      href: `/site/${id}/settings`,
      isActive: segments.includes("settings"),
      icon: <Settings width={18} />,
    },
    {
      name: "Community Handbook",
      href: `/site/${id}/handbook`,
      isActive: segments.includes("handbook"),
      icon: <IoBook width={18} />,
    },
    {
      name: "Resident Portal",
      href: `/site/${id}/portal`,
      isActive: segments.includes("portal"),
      icon: <FaUsers width={18} />,
    },
    {
      name: "Admin Portal",
      href: `/site/${id}/admin`,
      isActive: segments.includes("admin"),
      icon: <RiAdminFill width={18} />,
    },
  ];
  const MEMBER_SITE_LINKS = [
    {
      name: "Back to All Locations",
      href: "/sites",
      icon: <ArrowLeft width={18} />,
    },
    {
      name: "Homepage",
      href: `/site/${id}`,
      isActive: segments.length === 2,
      icon: <Newspaper width={18} />,
    },
    {
      name: "Community Handbook",
      href: `/site/${id}/handbook`,
      isActive: segments.includes("handbook"),
      icon: <IoBook width={18} />,
    },
    {
      name: "Resident Portal",
      href: `/site/${id}/portal`,
      isActive: segments.includes("portal"),
      icon: <FaUsers width={18} />,
    },
  ];
  const VISITOR_SITE_LINKS = [
    {
      name: "Back to All Locations",
      href: "/sites",
      icon: <ArrowLeft width={18} />,
    },
    {
      name: "Homepage",
      href: `/site/${id}`,
      isActive: segments.length === 2,
      icon: <Newspaper width={18} />,
    },
  ];
  const OWNER_POST_LINKS = [
    {
      name: "Back to All Posts",
      href: siteId ? `/site/${siteId}` : "/sites",
      icon: <ArrowLeft width={18} />,
    },
    {
      name: "Editor",
      href: `/post/${id}`,
      isActive: segments.length === 2,
      icon: <Edit3 width={18} />,
    },
    {
      name: "Settings",
      href: `/post/${id}/settings`,
      isActive: segments.includes("settings"),
      icon: <Settings width={18} />,
    },
  ];
  const VISITOR_POST_LINKS = [
    {
      name: "Back to All Posts",
      href: siteId ? `/site/${siteId}` : "/sites",
      icon: <ArrowLeft width={18} />,
    },
  ];

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      if (isOwner) {
        return OWNER_SITE_LINKS;
      } else if (isMember) {
        return MEMBER_SITE_LINKS;
      } else {
        return VISITOR_SITE_LINKS;
      }
    } else if (segments[0] === "post" && id) {
      if (isOwner) {
        return OWNER_POST_LINKS;
      } else {
        return VISITOR_POST_LINKS;
      }
    }
    return [
      {
        name: "Overview",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Profile Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-black p-4 transition-all dark:border-stone-700 dark:bg-black sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src="/brownstone-logo.png"
                width={360}
                height={100}
                alt="Logo"
                className="rounded-xl dark:scale-110 dark:border dark:border-stone-400"
              />
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
