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
    <div className="services-container section-padding">
      <div
        onClick={() => {
          navigate("arabic-writer");
        }}
        className="service shadow-1 fade-in fade-in-1"
      >
        <div className="service-icon shadow-0 gradient">
          <TfiWrite />
        </div>
        <p className="service-name">كتابة موضوع تعبير</p>
      </div>
      <div
        onClick={() => {
          navigate("function-changes");
        }}
        className="service shadow-1 fade-in fade-in-2"
      >
        <div className="service-icon shadow-0 gradient">
          <TbMathFunction />
        </div>
        <p className="service-name">دراسة تغيرات التابع</p>
      </div>
    </div>
  );
};

export default Home;
