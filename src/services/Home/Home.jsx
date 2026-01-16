import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { TbMathFunction } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="services-container section-padding grid pt-[60px] max-sm:pt-[40px] gap-[40px]">
      <div
        onClick={() => {
          navigate("arabic-writer");
        }}
        className="service shadow-1 fade-in fade-in-1 bg-white text-center rounded-[15px] pb-[20px] pt-[30px] relative cursor-pointer
"
      >
        <div
          className="service-icon absolute w-[50px] h-[50px] top-[0] left-[50%] rounded-[15px] shadow-0 gradient 
        translate-y-[-50%] translate-x-[-50%] flex justify-center items-center"
        >
          <TfiWrite className="text-white font-bold text-[30px]" />
        </div>
        <p className="service-name text-2xl">كتابة موضوع تعبير</p>
      </div>
      <div
        onClick={() => {
          navigate("function-changes");
        }}
        className="service shadow-1 fade-in fade-in-2 bg-white text-center rounded-[15px] pb-[20px] pt-[30px] relative cursor-pointer"
      >
        <div
          className="service-icon absolute w-[50px] h-[50px] top-[0] left-[50%] rounded-[15px] shadow-0 gradient 
        translate-y-[-50%] translate-x-[-50%] flex justify-center items-center"
        >
          <TbMathFunction className="text-white font-bold text-[30px]" />
        </div>
        <p className="service-name text-2xl">دراسة تغيرات التابع</p>
      </div>
    </div>
  );
};

export default Home;
