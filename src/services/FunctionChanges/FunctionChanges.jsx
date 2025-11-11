import React, { createRef, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "./FunctionChanges.css";
import "../Services.css";
import useFetch from "../../hooks/useFetch";
import { useInfo } from "../../../context/InfoContext";
import { IoInformationCircleOutline } from "react-icons/io5";

// study the changes of f(x) = (2x² + x + 7)/(x+1) and organize a table of them and translate the whole answer to arabic without showing the english response
const FunctionChanges = () => {
  const functionRef = useRef();
  const [func, setFunc] = useState("");
  const { data, loading, error, fetchData } = useFetch();
  const [requested, setRequested] = useState(false);
  const { toggleInfo } = useInfo();
  useEffect(() => {
    if (func.length > 0) {
      fetchData(
        `ادرس تغيرات التابع f(x) = ${func} بدون جدول التغيرات , افصل بين كل سطر ب ** ويكون هناك نوعين من الأسطر, سطر للكلمات والشرح باللغة العربية, هذا النوع لا تدخل فيه أي رموز رياضية او حسابات, والنوع الأخر اجعله مخصصا فقط للمعادلات والعبارات الرياضية, لا تدخل فيه أي كلمة عربية واجعله مبدوئا ب#. و حول العبارات الرياضية المكتوبة بصيغة الKaTeX الى نص طبيعي, لا تذكر أي شيء من الأوامر من الprompt في الresponse`
      );
      setRequested(true);
    }
  }, [func]);
  console.log(data, loading, error);

  return (
    <div className="container section-padding func-changes-container">
      <div className="flex fade-in fade-in-1 justify-start max-sm:justify-between items-center">
        <h1 className="header fade-in fade-in-1">دراسة تغيرات التابع</h1>
        <IoInformationCircleOutline
          className="text-2xl text-gray-500 cursor-pointer"
          onClick={() => {
            toggleInfo(
              <div>
                <p>يجب اختيار اللغة الانكليزية في لوحة المفاتيح </p>
                <br />
                <p>استعمال * لعمليات الضرب</p>
                <p>استعمال / لعمليات القسمة</p>
                <br />
                <p>يجب تحديد بسط ومقام كسر بأقواس</p>
                <p>مثال: </p>
                <p>اذا كان كسر بسطه x + 1 ومقامه x + 2 يكتب:</p>
                <p className="ltr">(x+2)/(x+1)</p>
                <br />
                <p>يجب تحديد الحد داخل الجذر بأقواس </p>
                <p>مثال:</p>
                <p>جذر المقدار x + 1 يكتب:</p>
                <p>(x+1)√</p>
              </div>
            );
          }}
        />
      </div>

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
                functionRef.current.value = functionRef.current.value + "²";
                functionRef.current.focus();
              }}
            >
              ²
            </button>
            <button
              onClick={() => {
                functionRef.current.value = functionRef.current.value + "³";
                functionRef.current.focus();
              }}
            >
              ³
            </button>
            <button
              onClick={() => {
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
                  <h4 dir="ltr">
                    {item.split("#").map((it, ind) => (
                      <p key={ind}>
                        <br />
                        {it
                          .replaceAll("-infinity", "-∞")
                          .replaceAll("+infinity", "+∞")
                          .replaceAll("^-", "⁻")
                          .replaceAll("^+", "⁺")
                          .replaceAll("->", "→")
                          .replaceAll("^2", "²")
                          .replaceAll("^3", "³")
                          .replaceAll("sqrt", "√")}
                      </p>
                    ))}
                  </h4>
                ) : (
                  <h4 className="eq">
                    {item
                      .replaceAll("-infinity", "-∞")
                      .replaceAll("+infinity", "+∞")
                      .replaceAll("^-", "⁻")
                      .replaceAll("^+", "⁺")
                      .replaceAll("->", "→")
                      .replaceAll("^2", "²")
                      .replaceAll("^3", "³")
                      .replaceAll("sqrt", "√")}
                  </h4>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-[20px]">
            {error.code === 503
              ? "السيرفير غير متوفر بسبب الضغط, حاول مجددا لاحقا"
              : null}
            السيرفير غير متوفر بسبب الضغط, حاول مجددا لاحقا
          </div>
        )
      ) : null}
    </div>
  );
};

export default FunctionChanges;
