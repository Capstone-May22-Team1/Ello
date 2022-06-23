import React, { createContext, useState } from "react";

export const ColourContext = createContext()

export const ColourProvider = ({ children }) => {
  const [colourBlind, setColourBlind] = useState(true)

  return (
    <ColourContext.Provider value={{ colourBlind, setColourBlind }}>
      {children}
    </ColourContext.Provider>
  );
};
