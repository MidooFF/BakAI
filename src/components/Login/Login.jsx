import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (username.length < 6) {
      setUsernameError("اسم المستخدم لا يقل عن 6 أحرف");
      return;
    } else {
      setUsernameError("");
    }
    if (password.length < 8) {
      setPasswordError("كلمة المرور لا تقل عن 8 أحرف");
      return;
    } else {
      setPasswordError("");
    }
    setLoading(true);
    console.log("running");
    try {
      const response = await axios.post(
        "https://bacai-backend.onrender.com/auth",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setLoading(false);
      setIsLoggedIn(true);

      navigate("/services");
      console.log("login succeed");
    } catch (err) {
      if (err.status == 401) {
        setUsernameError("هذا الاسم غير مسجل في قاعدة البيانات");
      } else if (err.status == 403) {
        setPasswordError("كلمة المرور غير صحيحة");
      } else {
        setUsernameError("");
      }
      setLoading(false);
    }
  };

  return (
    <div className="section-padding mt-[40px]">
      <h1 className="text-center text-5xl max-sm:text-3xl ">تسجيل الدخول</h1>
      <div
        className="bg-white shadow-3 rounded-[20px] w-[500px]  mx-auto mt-[40px] p-[15px] py-[50px] pb-[30px]
      max-sm:mt-[20px] max-sm:w-full"
      >
        <div className="flex flex-col mb-[40px]">
          <label
            htmlFor="login-username"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            اسم المستخدم:
          </label>
          <div className="main-input">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="login-username"
            />
            <div></div>
          </div>
          <div
            className={`handle-error ${usernameError ? "active" : "disactive"}`}
          >
            {usernameError}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="login-password"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            كلمة المرور:
          </label>
          <div className="main-input">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="login-password"
            />
            <div></div>
          </div>
          <div
            className={`handle-error ${passwordError ? "active" : "disactive"}`}
          >
            {passwordError}
          </div>
        </div>

        <div className="flex justify-center">
          {" "}
          <button
            disabled={loading ? true : false}
            onClick={handleLogin}
            className={`gradient text-white text-2xl ext-center p-[10px] mt-[60px] rounded-[10px]
        cursor-pointer max-sm:text-[20px] max-sm:mt-[30px] font-bold ${
          loading ? "opacity-70" : ""
        }`}
          >
            تسجيل الدخول
          </button>
        </div>
        <p className="text-center text-gray-500 mt-[20px]">
          ليس لديك حساب؟{" "}
          <Link to="/sign-up" className="text-blue-500 cursor-pointer ">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
