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

const useGeoLocation = () => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    geoInfo: null,
    isBlockedRegion: false,
  });

  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org");
        const ip = await ipResponse.text();

        const geoResponse = await fetch(
          `https://free.freeipapi.com/api/json/${ip}`
        );
        const geoInfo = await geoResponse.json();
        setState({
          loading: false,
          error: null,
          geoInfo,
          isBlockedRegion: geoInfo.countryCode == "SY",
        });
      } catch (error) {
        setState({
          loading: true,
          error: error.message,
          geoInfo: null,
          isBlockedRegion: false,
        });
        console.log("failed to fetch geo info: ", err);
      }
    };
    fetchGeoInfo();
  }, []);
  return state;
};

const LoadingScreen = () => (
  <div className="w-[100vw] h-[50vh] relative">
    <div className="absolute left-[50%] translate-x-[-50%] bottom-[-60%] max-w-[100%] max-h-[100%]">
      <Atom color="#ff00e9" size="medium" text="" textColor="" />
    </div>
  </div>
);

const AppRoutes = () => {
  const { loading: geoLoading, isBlockedRegion } = useGeoLocation();
  // const { isLoggedIn, loading: authLoading } = useAuth();
  const isLoggedIn = true;
  const authLoading = false;

  if (geoLoading || authLoading) {
    return <LoadingScreen />;
  }

  if (isBlockedRegion) {
    return <VPN />;
  }

  return (
    <>
      <Routes>
        {/*public routes */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/services" />}
        />
        <Route
          path="/sign-up"
          element={!isLoggedIn ? <SignUp /> : <Navigate to="/services" />}
        />

        {/*protected routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          {/*fallback routes */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/services" : "/login"} />}
          />
        </Route>
      </Routes>
    </>
  );
};

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Routes>
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/services/arabic-writer"
          element={
            <>
              <Navbar />
              <ArabicWriterWrapper />
            </>
          }
        />
        <Route
          path="/services/function-changes"
          element={
            <>
              <Navbar />
              <FunctionChangesWrapper />
            </>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  // useGeoLocation();
  // const AppRoutes = () => {
  //   const [ipLoading, setIpLoading] = useState(true);
  //   const [ipError, setIpError] = useState(false);
  //   const [ipAddress, setIpAddress] = useState("");
  //   const [geoInfo, setGeoInfo] = useState({});

  //   useEffect(() => {
  //     getVisitorIP();
  //   }, []);

  //   const getVisitorIP = async () => {
  //     try {
  //       const response = await fetch("https://api.ipify.org");
  //       const ip = await response.text();
  //       setIpAddress(response);
  //       await fetchIPInfo(ip);
  //     } catch (err) {
  //       setIpLoading(false);
  //       setIpError(true);
  //       console.log("Failed to fetch IP: ", err);
  //     }
  //   };

  //   const fetchIPInfo = async (ip) => {
  //     try {
  //       const response = await fetch(
  //         `https://free.freeipapi.com/api/json/${ip}`
  //       );
  //       const data = await response.json();
  //       setGeoInfo(data);
  //       setIpLoading(false);
  //     } catch (err) {
  //       setIpLoading(false);
  //       setIpError(true);
  //       console.log("Failed to location Info: " + err);
  //     }
  //   };

  //   // const { isLoggedIn, loading } = useAuth();
  //   const isLoggedIn = true;
  //   const loading = false;

  //   if (ipLoading) {
  //     return (
  //       <div className="w-[100vw] h-[100vh] relative">
  //         <div className="absolute left-[50%] translate-x-[-50%] bottom-[20%]">
  //           <Atom color="#ff00e9" size="medium" text="" textColor="" />
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (geoInfo.countryCode == "SY") {
  //     return <VPN></VPN>;
  //   }

  //   if (loading) {
  //     return (
  //       <div className="w-[100vw] h-[100vh] relative">
  //         <div className="absolute left-[50%] translate-x-[-50%] bottom-[20%]">
  //           <Atom color="#ff00e9" size="medium" text="" textColor="" />
  //         </div>
  //       </div>
  //     );
  //   }

  //   if (!isLoggedIn) {
  //     return (
  //       <Routes>
  //         <Route path="*" element={<Navigate to="/login" />} />
  //         <Route path="/" element={<Navigate to="/login"></Navigate>} />
  //         <Route path="/login" element={<Login></Login>} />
  //         <Route path="/sign-up" element={<SignUp></SignUp>} />
  //       </Routes>
  //     );
  //   }
  //   return (
  //     <>
  //       {isLoggedIn ? <Navbar></Navbar> : null}

  //       <Routes>
  //         <Route path="*" element={<Navigate to="/services" />} />

  //         <Route path="/" element={<Navigate to="/services"></Navigate>} />
  //         <Route path="/services" element={<Home />}></Route>
  //         <Route
  //           path="/services/arabic-writer"
  //           element={<ArabicWriterWrapper />}
  //         ></Route>
  //         <Route
  //           path="/services/function-changes"
  //           element={<FunctionChangesWrapper />}
  //         ></Route>
  //       </Routes>
  //     </>
  //   );
  // };
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
