import React, { createRef, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "./FunctionChanges.css";
import "../Services.css";
import useFetch from "../../hooks/useFetch";

// study the changes of f(x) = (2x² + x + 7)/(x+1) and organize a table of them and translate the whole answer to arabic without showing the english response
const FunctionChanges = () => {
  const functionRef = useRef();
  const [func, setFunc] = useState("");
  const { data, loading, error, fetchData } = useFetch();
  const [requested, setRequested] = useState(false);
  console.log(data);

  useEffect(() => {
    if (func.length > 0) {
      console.log("Hello");
      fetchData(
        `Study the changes of the function f(x) = ${func} and translate the whole answer to arabic and only show the arabic response and don't combine arabic letters with math equations in one line and separate between every line of solution with ** and if the line is a math equation and don't have an arabic word make it Preceded with # and if the line has more than one equation put ** between every equation and convert the LaTeX code to symbols`
      );
      setRequested(true);
    }
  }, [func]);

  return (
    <div className="container section-padding func-changes-container">
      <h1 className="header fade-in fade-in-1">دراسة تغيرات التابع</h1>

      <div className="main-form fade-in fade-in-2 max-sm:flex-row">
        <h2 className="mb-[10px]">التابع:</h2>
        <div className="flex gap-[10px] ">
          <div className="main-input">
            <input dir="ltr" ref={functionRef} />
            <div></div>
          </div>
          <div className="shortcuts">
            <button
              onClick={() => {
                console.log(functionRef.current);
                functionRef.current.value = functionRef.current.value + "²";
                functionRef.current.focus();
              }}
            >
              ²
            </button>
            <button
              onClick={() => {
                console.log(functionRef.current);
                functionRef.current.value = functionRef.current.value + "³";
                functionRef.current.focus();
              }}
            >
              ³
            </button>
            <button
              onClick={() => {
                console.log(functionRef.current);
                functionRef.current.value = functionRef.current.value + "√";
                functionRef.current.focus();
              }}
            >
              √
            </button>
          </div>
        </div>
      </div>
      <a href="#function-changes-response">
        <button
          className={`generate gradient fade-in fade-in-4 `}
          disabled={requested}
          onClick={() => {
            if (!functionRef.current.value.length == 0) {
              setFunc(functionRef.current.value);
            }
          }}
        >
          Generate
        </button>
      </a>

      {requested ? (
        loading ? (
          <div>
            {" "}
            <div id="function-changes-response" className="loading">
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
          </div>
        ) : data ? (
          <div className="response">
            {data.split("**").map((item, index) => (
              <div key={index} lang="ar" className="p-[10px, 0]">
                {item.includes("#") ? (
                  <h4 dir="ltr">{item.replace("#", " ")}</h4>
                ) : (
                  <h4 className="eq">{item}</h4>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>{error}</div>
        )
      ) : null}
    </div>
  );
};

export default FunctionChanges;
