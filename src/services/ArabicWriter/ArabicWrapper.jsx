// ArabicWriterWrapper.js
import React from "react";
import { InfoProvider } from "../../../context/InfoContext";
import ArabicWriter from "./ArabicWriter";

const ArabicWriterWrapper = () => {
  return (
    <InfoProvider>
      <ArabicWriter />
    </InfoProvider>
  );
};

export default ArabicWriterWrapper;
