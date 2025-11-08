import React from "react";
import { InfoProvider } from "../../../context/InfoContext";
import FunctionChanges from "./FunctionChanges";

const FunctionChangesWrapper = () => {
  return (
    <InfoProvider>
      <FunctionChanges />
    </InfoProvider>
  );
};

export default FunctionChangesWrapper;
