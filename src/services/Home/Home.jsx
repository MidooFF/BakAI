import React, { useEffect } from "react";
import { TfiWrite } from "react-icons/tfi";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="services-container section-padding">
      <div
        onClick={() => {
          navigate("/arabic-writer");
        }}
        className="service shadow-1 fade-in fade-in-1"
      >
        <div className="service-icon shadow-0 gradient">
          <TfiWrite />
        </div>
        <p className="service-name">كتابة موضوع تعبير</p>
      </div>
    </div>
  );
};

export default Home;
