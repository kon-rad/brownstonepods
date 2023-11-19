"use client";

import { usePolyfire } from "polyfire-js/hooks";
import React, { useState, useEffect } from "react";

const ChatBox = () => {
  const { auth, models } = usePolyfire();
  const { login, status } = auth;
  const [helloWorld, setHelloWorld] = useState<string>();
  const { generate } = models;
  let element = null;

  useEffect(() => {
    if (status === "authenticated") {
      generate("Write a hello world haiku").then(setHelloWorld);
    }
  }, [status]);
  if (status == "unauthenticated")
    element = (
      <button onClick={() => login("github")}>Login With GitHub</button>
    );
  else if (status == "loading") element = <div>Loading...</div>;
  else if (status == "authenticated")
    element = <div>We already logged in!</div>;
  else element = <div />;

  return (
    <div className="text-white">
      {element}
      polyfire^
      {helloWorld}
      hello world
    </div>
  );
};

export default ChatBox;
