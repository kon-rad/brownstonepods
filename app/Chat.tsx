"use client";
import { usePolyfire } from "polyfire-js/hooks";
import { useState, useEffect } from "react";

import { Chat as ChatType } from "polyfire-js";

import ChatUI from "@polyfact/chat";

const BOT_NAME = "brownstone";

const defaultColors = {
  chatBackgroundColor: "rgba(111, 111, 111, 0.1)",
  chatTextColor: "white",
  inputBackgroundColor: "#E2E8F0",
  inputColor: "#2D3748",
  placeholderTextColor: "#A0AEC0",
  botMessageColor: "#2D3748",
  botMessageBackgroundColor: "rgba(220, 242, 247)",
  userMessageColor: "#E2E8F0",
  userMessageBackgroundColor: "#4A5568",
  buttonBackgroundColor: "#4A5568",
  buttonBorderColor: "#2D3748",
  dotsColor: "#A0AEC0",
};

export function Chatbot() {
  const {
    auth: { login, status },
    utils: { Chat },
  } = usePolyfire();
  const [chat, setChat] = useState<ChatType>();

  useEffect(() => {
    if (!chat) {
      setChat(new Chat({ autoMemory: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (login && status === "unauthenticated") {
    return (
      <button
        onClick={() => login({ provider: "github" })}
        className="login-btn"
      >
        Login with Github
      </button>
    );
  }

  if (status === "loading") {
    return <div>loading ...</div>;
  }

  if (chat && status === "authenticated") {
    return (
      <ChatUI
        chat={chat}
        botName={BOT_NAME}
        buttonBorderWidth="1px"
        {...defaultColors}
      />
    );
  }

  return null;
}
