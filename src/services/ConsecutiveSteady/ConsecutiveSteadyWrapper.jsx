import React from "react";
import { InfoProvider } from "../../../context/InfoContext";
import ConsecutiveSteady from "./ConsecutiveSteady";

const ConsecutiveSteadyWrapper = () => {
  return (
    <InfoProvider>
      <ConsecutiveSteady />
    </InfoProvider>
  );
};

export default ConsecutiveSteadyWrapper;
