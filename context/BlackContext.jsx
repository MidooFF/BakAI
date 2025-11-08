import React, { createContext, useContext, useEffect, useState } from "react";
const BlackContext = createContext();

export const useBlack = () => {
  const context = useContext(BlackContext);
  if (!context) {
    throw new Error("black context must be used within black provider ");
  }
  return context;
};

export const BlackProvider = ({ children }) => {
  const toggleBlack = () => {
    setBlackToggle((prev) => !prev);
  };
  const [blackToggle, setBlackToggle] = useState(false);
  const value = { toggleBlack };

  useEffect(() => {
    if (blackToggle) {
      document.body.classList.add("scroll-off");
    } else {
      document.body.classList.remove("scroll-off");
    }
  }, [blackToggle]);
  return (
    <BlackContext.Provider value={value}>
      <div
        className={`w-[100vw] h-[1000%] bg-[#00000033] mt-[-90px] z-[20]  absolute opacity-0 ${
          blackToggle ? "black-on" : "black-off"
        }`}
      ></div>

      {children}
    </BlackContext.Provider>
  );
};
