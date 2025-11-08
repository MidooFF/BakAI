import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IoClose } from "react-icons/io5";
import { useBlack } from "./BlackContext";

const InfoContext = createContext();

export const useInfo = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfo must be used within InfoProvider");
  }
  return context;
};

export const InfoProvider = ({ children }) => {
  const { toggleBlack } = useBlack();

  const [infoToggle, setInfoToggle] = useState(false);
  const [content, setContent] = useState();
  const toggleInfo = (content) => {
    setContent(content);
    toggleBlack();
    setInfoToggle(!infoToggle);
  };
  const value = { toggleInfo };
  useEffect(() => {
    if (infoToggle) {
      document.querySelector(".info-box").classList.remove("info-off");
      document.querySelector(".info-box").classList.add("info-on");
    } else {
      document.querySelector(".info-box").classList.remove("info-on");
      document.querySelector(".info-box").classList.add("info-off");
    }
  }, [infoToggle]);
  return (
    <InfoContext.Provider value={value}>
      {children}

      <div
        className="info-box fixed w-full h-[400px] bottom-[-400px] left-0 bg-white rounded-tl-[80px] rounded-tr-[80px] 
      duration-[500ms] z-[30] max-sm:rounded-tr-[50px] max-sm:rounded-tl-[50px] overflow-y-scroll"
      >
        <IoClose
          onClick={() => toggleInfo(content)}
          className="mr-[30px] mt-[30px] text-4xl cursor-pointer mx-sm:text-[6px] max-sm:mr-[20px] max-sm:mt-[20px]"
        />

        <div className="section-padding mt-[20px]">
          {" "}
          {content ? content : null}
        </div>
      </div>
    </InfoContext.Provider>
  );
};
