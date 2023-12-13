import React, { createContext, useState } from "react";

// Create your context
const GlobalStateContext = createContext<any>({});

// Create your provider
const GlobalStateProvider: React.FC = ({ children }: any) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  return (
    <GlobalStateContext.Provider value={(isOwner, setIsOwner)}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
