import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import ArabicWriter from "./services/ArabicWriter/ArabicWriter.jsx";
import Home from "./services/Home/Home.jsx";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/arabic-writer" element={<ArabicWriter />}></Route>
      </Routes>
    </>
  );
}

export default App;
