import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./services/Home/Home.jsx";
import ArabicWriter from "./services/ArabicWriter/ArabicWriter.jsx";
import ArabicWriterWrapper from "./services/ArabicWriter/ArabicWrapper.jsx";
import FunctionChanges from "./services/FunctionChanges/FunctionChanges.jsx";
import FunctionChangesWrapper from "./services/FunctionChanges/FunctionChangesWrapper.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { Atom } from "react-loading-indicators";
import { BlackProvider } from "../context/BlackContext.jsx";
import VPN from "./components/VPN/VPN.jsx";

function App() {
  const AppRoutes = () => {
    const [ipLoading, setIpLoading] = useState(true);
    const [ipError, setIpError] = useState(false);
    const [ipAddress, setIpAddress] = useState("");
    const [geoInfo, setGeoInfo] = useState({});

    useEffect(() => {
      getVisitorIP();
    }, []);

    const getVisitorIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org");
        const ip = await response.text();
        setIpAddress(response);
        await fetchIPInfo(ip);
      } catch (err) {
        setIpLoading(false);
        setIpError(true);
        console.log("Failed to fetch IP: ", err);
      }
    };

    const fetchIPInfo = async (ip) => {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        setGeoInfo(data);
        setIpLoading(false);
      } catch (err) {
        setIpLoading(false);
        setIpError(true);
        console.log("Failed to location Info: " + err);
      }
    };

    // const { isLoggedIn, loading } = useAuth();
    const isLoggedIn = true;
    const loading = false;

    if (ipLoading) {
      return (
        <div className="w-[100vw] h-[100vh] relative">
          <div className="absolute left-[50%] translate-x-[-50%] bottom-[20%]">
            <Atom color="#ff00e9" size="medium" text="" textColor="" />
          </div>
        </div>
      );
    }

    if (geoInfo.countryCode == "SY") {
      return <VPN></VPN>;
    }

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
            element={<ArabicWriterWrapper />}
          ></Route>
          <Route
            path="/services/function-changes"
            element={<FunctionChangesWrapper />}
          ></Route>
        </Routes>
      </>
    );
  };
  return (
    <>
      <AuthProvider>
        <BlackProvider>
          <AppRoutes></AppRoutes>
        </BlackProvider>
      </AuthProvider>
    </>
  );
}

export default App;
