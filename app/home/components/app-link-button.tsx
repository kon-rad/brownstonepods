"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const AppLinkButton = () => {
  const [appURL, setAppURL] = useState("https://app.brownstonepods.com");

  useEffect(() => {
    const newAppURL = `${window.location.protocol}//app.${
      window.location.hostname
    }${window.location.port ? ":" + window.location.port : ""}`;
    setAppURL(newAppURL);
    console.log("app link button appURL: ", newAppURL);
  }, []);

  return (
    <Link className="mr-8 cursor-pointer" href={appURL}>
      Go to App
    </Link>
  );
};

export default AppLinkButton;
