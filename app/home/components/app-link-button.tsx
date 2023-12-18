"use client";

import Link from "next/link";

const AppLinkButton = () => {
  const appURL = `${window.location.protocol}//app.${window.location.hostname}${
    window.location.port ? ":" + window.location.port : ""
  }`;

  console.log("app link button appURL: ", appURL);

  return (
    <Link className="mr-8 cursor-pointer" href={appURL}>
      Go to App
    </Link>
  );
};

export default AppLinkButton;
