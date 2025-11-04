import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

import "./SignUp.css";
const SignUp = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const usernameOptions = {
    min: 5,
    max: 26,
    lowerCase: 0,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
    requirementCount: 0,
  };
  const passwordOptions = {
    min: 7,
    max: 26,
    lowerCase: 0,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
    requirementCount: 0,
  };
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSignUp = async () => {
    const usernameValidate =
      passwordComplexity(usernameOptions).validate(username);
    if (usernameValidate.error) {
      const type = usernameValidate.error.details[0].type;
      if (type == "string.empty");
      setUsernameError("هذه الخانة مطلوبة");
      if (type == "passwordComplexity.tooShort")
        setUsernameError("يجب إدخال 6 أحرف على الأقل");
      if (type == "passwordComplexity.numeric")
        setUsernameError("يجب إدخال رقم واحد على الأقل");
      return;
    } else {
      setUsernameError("");
    }
    const passwordValidate =
      passwordComplexity(passwordOptions).validate(password);
    if (passwordValidate.error) {
      const type = passwordValidate.error.details[0].type;
      if (type == "string.empty") setPasswordError("هذه الخانة مطلوبة");
      if (type == "passwordComplexity.tooShort")
        setPasswordError("يجب إدخال 8 أحرف على الأقل");
      if (type == "passwordComplexity.numeric")
        setPasswordError("يجب إدخال رقم واحد على الأقل");
      return;
    } else {
      setPasswordError("");
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://bacai-backend.onrender.com/register",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      setIsLoggedIn(true);
      setLoading(false);
      navigate("/");
    } catch (err) {
      if (err.status == 409) {
        setUsernameError("هذا الاسم مستخدم سابقا");
      } else {
        setUsernameError("");
      }
      setLoading(false);
    }
  };

  return (
    <div className="section-padding mt-[40px]">
      <h1 className="text-center text-5xl max-sm:text-3xl ">إنشاء حساب</h1>
      <div
        className="bg-white shadow-3 rounded-[20px] w-[500px]  mx-auto mt-[40px] p-[15px] py-[50px] pb-[30px]
          max-sm:mt-[20px] max-sm:w-full"
      >
        <div className="flex flex-col mb-[40px]">
          <label
            htmlFor="signup-username"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            اسم المستخدم:
          </label>
          <div className="main-input">
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="signup-username"
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
            htmlFor="signup-password"
            className="text-2xl mb-[10px] max-sm:text-[18px]"
          >
            كلمة المرور:
          </label>
          <div className="main-input">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              id="signup-password"
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
            onClick={handleSignUp}
            className={`gradient text-white text-2xl ext-center p-[10px] mt-[60px] rounded-[10px]
        cursor-pointer max-sm:text-[20px] max-sm:mt-[30px] font-bold ${
          loading ? "opacity-80" : ""
        }`}
          >
            إنشاء الحساب
          </button>
        </div>
        <p className="text-center text-gray-500 mt-[20px]">
          لديك حساب مسبقا؟{" "}
          <Link to="/login" className="text-blue-500 cursor-pointer ">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
