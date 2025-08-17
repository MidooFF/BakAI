import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./services/Home/Home.jsx";
import ArabicWriter from "./services/ArabicWriter/ArabicWriter.jsx";
import FunctionChanges from "./services/FunctionChanges/FunctionChanges.jsx";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/arabic-writer" element={<ArabicWriter />}></Route>
        <Route path="/function-changes" element={<FunctionChanges />}></Route>
      </Routes>
    </>
  );
}

export default App;
