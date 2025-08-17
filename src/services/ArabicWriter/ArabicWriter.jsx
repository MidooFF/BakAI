import React, { useRef, useState, useEffect, createRef } from "react";
import "./ArabicWriter.css";
import "../Services.css";
import useFetch from "../../hooks/useFetch";

const ArabicWriter = () => {
  const mainIdea = useRef();
  const [subIdeas, setSubIdeas] = useState([]);
  const [subIdeasData, setSubIdeasData] = useState([]);
  const subIdeasRef = useRef();
  const [inputError, setInputError] = useState("");
  const inputErrorRef = useRef();
  const { data, loading, error, fetchData } = useFetch();
  const [requested, setRequested] = useState(false);

  console.log(error);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (subIdeasData.length > 0) {
      const content = `اكتب موضوعا أدبيا تتحدث فيه عن ${
        mainIdea.current.value
      }, ${subIdeasData.map(
        (item, index) =>
          `الفكرة ${index + 1}: ${item[0]}, شاهدها: ${item[1]}, الشاعر: ${
            item[2]
          }, اجعل كل شاهد في نهاية كل فكرة واذكر قبل كل شاهد شاعره (كما يقول الشاعر :) لا تضع عنوان للموضوع وأرسل الإجابة بهيئة HTML Elements حيث تكون المقدمة في عنصر والخاتمة في عنصر وكل فكرة في عنصر div`
      )}`;
      fetchData(content);
      setRequested(true);
    }
  }, [subIdeasData]);

  return (
    <div className="container section-padding">
      <div
        className={`error ${inputError ? "active" : ""}`}
        ref={inputErrorRef}
      >
        {inputError}
      </div>
      <h1 className="header fade-in fade-in-1">كتابة موضوع تعبير</h1>
      <div className="main-form fade-in fade-in-2">
        <h2 className="">الفكرة العامة: </h2>
        <div className="main-input">
          <input ref={mainIdea} />
          <div></div>
        </div>
      </div>
      <div className="sub-ideas" ref={subIdeasRef}>
        {subIdeas
          ? subIdeas.map((item, index) => {
              return (
                <div className="sub-idea" key={index}>
                  <div className="main">
                    <h2>الفكرة {index + 1}:</h2>
                    <div className="main-input">
                      <input />
                      <div></div>
                    </div>
                  </div>
                  <div className="others">
                    <div className="witness">
                      {" "}
                      <h2>الشاهد :</h2>
                      <div className="main-input">
                        <input />
                        <div></div>
                      </div>
                    </div>
                    <div className="poet">
                      <h2>الشاعر :</h2>
                      <div className="main-input">
                        <input />
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <button
        className={`add-sub-idea shadow-0 fade-in fade-in-3`}
        disabled={requested}
        onClick={() => {
          setSubIdeas((prev) => [...prev, subIdeas.length]);
        }}
      >
        أضف فكرة فرعية +
      </button>
      <a href="#arabic-writer-response">
        <button
          className={`generate gradient fade-in fade-in-4 `}
          disabled={requested}
          onClick={() => {
            if (!mainIdea.current.value) {
              setInputError("يجب إدخال الفكرة الأساسية");
            } else if (subIdeasRef.current.children.length == 0) {
              setInputError("يجب إدخال فكرة واحدة على الأقل");
            } else {
              for (let i = 0; i < subIdeasRef.current.children.length; i++) {
                let mainIdea =
                  subIdeasRef.current.children[i].children[0].children[1]
                    .children[0].value;
                let witness =
                  subIdeasRef.current.children[i].children[1].children[0]
                    .children[1].children[0].value;
                let poet =
                  subIdeasRef.current.children[i].children[1].children[1]
                    .children[1].children[0].value;
                if (!mainIdea || !witness || !poet) {
                  setInputError("يجب إدخال كل مدخلات الفكرة");
                } else {
                  setInputError("");
                  setSubIdeasData((prev) => [
                    ...prev,
                    [mainIdea, witness, poet],
                  ]);
                }
              }
            }
          }}
        >
          Generate
        </button>
      </a>

      {requested ? (
        loading ? (
          <div id="arabic-writer-response" className="loading">
            <div className="short"></div>
            <div></div>
            <div></div>
            <div className="short"></div>
            <div></div>
            <div></div>
            <div className="short"></div>
            <div></div>
            <div></div>
            <div className="short"></div>
            <div></div>
            <div></div>
            <div className="short"></div>
            <div></div>
            <div></div>
          </div>
        ) : error ? (
          <div id="arabic-writer-response">{error}</div>
        ) : data ? (
          <div className="response" id="arabic-writer-response">
            {data
              .split("<div>")
              .join()
              .split("</div>")
              .join("")
              //   .split(",")
              //   .join("||")
              .split("<p>")
              .join("")
              .split("</p>")
              //   .split("<section>")
              //   .join("||")
              //   .split("</section>")
              //   .split("||")
              .map((item, index) => (
                <div key={index}>{item}</div>
              ))}
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default ArabicWriter;
