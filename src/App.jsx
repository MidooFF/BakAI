import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./services/Home/Home.jsx";
import ArabicWriter from "./services/ArabicWriter/ArabicWriter.jsx";
import FunctionChanges from "./services/FunctionChanges/FunctionChanges.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { Atom } from "react-loading-indicators";

function App() {
  const AppRoutes = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
      return (
        <div className="w-[100vw] h-[100vh] relative">
          <div className="absolute left-[50%] translate-x-[-50%] bottom-[20%]">
            <Atom color="#ff00e9" size="medium" text="" textColor="" />
          </div>
        </div>
      );
    }

    if (!isLoggedIn) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login"></Navigate>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/sign-up" element={<SignUp></SignUp>} />
        </Routes>
      );
    }
    return (
      <>
        {isLoggedIn ? <Navbar></Navbar> : null}

        <Routes>
          <Route path="*" element={<Navigate to="/services" />} />

          <Route path="/" element={<Navigate to="/services"></Navigate>} />
          <Route path="/services" element={<Home />}></Route>
          <Route
            path="/services/arabic-writer"
            element={<ArabicWriter />}
          ></Route>
          <Route
            path="/services/function-changes"
            element={<FunctionChanges />}
          ></Route>
        </Routes>
      </>
    );
  };
  return (
    <>
      <AuthProvider>
        <AppRoutes></AppRoutes>
      </AuthProvider>
    </>
  );
}

export default App;
