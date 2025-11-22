import React, { createRef, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "./FunctionChanges.css";
import "../Services.css";
import useFetch from "../../hooks/useFetch";
import { useInfo } from "../../../context/InfoContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { InlineMath, BlockMath } from "react-katex";
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
        `حلل تغيرات التابع ${func} باللغة العربية. التزم بالتعليمات التالية بدقة تامة:

1.  **التنسيق الرياضي:**
    *   استخدم & قبل وبعد أي **رمز رياضي أو تعبير جبري قصير** مدمج في سياق الجملة. أمثلة: &R&, &−∞&, &x = 0&, &f(0) = -4&, &(-∞, 0)&, &f'(x) > 0&.
    *   استخدم $ قبل وبعد أي **معادلة أو صيغة رياضية رئيسية** تحتاج سطراً مستقلاً (مثل النهايات، إيجاد المشتقة الرئيسية، مقارنات).
    *   **هام:** إذا كانت الصيغة الرياضية (مثل المشتقة &f'(x) = 3x^2&) قصيرة ويمكن دمجها في جملة، استخدم & بدلاً من $. استخدم $ فقط للصيغ التي تتطلب سطرها الخاص.
    *   لا تستخدم أي علامات أو تنسيقات أخرى.

2.  **المحتوى المطلوب:**
    *   أ) نهايات التابع عند الأطراف المفتوحة وصوره عند الأطراف المغلقة.
    *   ب) استنتاج المقاربات (أفقية، شاقولية، مائلة) ودراسة الوضع النسبي.
    *   ج) إيجاد مشتق التابع ودراسة تغيراته (تزايد، تناقص، قيم قصوى) **بدون** جدول.

3.  **مثال للإخراج (افترض ${func} = x^3 - 8):**`
      );
      setRequested(true);
    }
  }, [func]);
  const processTextFormatting = (text) => {
    if (!text) return null;

    // Split by ** for main titles
    return text.split(/\*\*(.*?)\*\*/).map((segment, index) => {
      if (index % 2 === 1) {
        // This is a main title (between **)
        return (
          <h3 key={index} className="main-title">
            {segment}
          </h3>
        );
      } else {
        // Process the remaining text for * markers
        return segment.split(/\*(.*?)\*/).map((subSegment, subIndex) => {
          if (subIndex % 2 === 1) {
            // This is a sub title (between *)
            return (
              <h4 key={`${index}-${subIndex}`} className="sub-title">
                {subSegment}
              </h4>
            );
          } else {
            // Regular text
            return <span key={`${index}-${subIndex}`}>{subSegment}</span>;
          }
        });
      }
    });
  };

  // Function to render text with mixed Arabic and math expressions
  const renderMixedContent = (text) => {
    if (!text) return null;

    return text.split("&").map((part, index) => {
      // Even indices are Arabic text, odd indices are inline math
      if (index % 2 === 0) {
        return (
          <span key={index} dir="rtl">
            {processTextFormatting(part)}
          </span>
        );
      } else {
        return (
          <span key={index} dir="ltr">
            <InlineMath math={part.trim()} />
          </span>
        );
      }
    });
  };

  // Function to parse the entire response
  const parseResponse = (responseText) => {
    if (!responseText) return null;

    return responseText.split("$").map((segment, index) => {
      // Even indices are mixed content (Arabic + inline math)
      // Odd indices are block math equations
      if (index % 2 === 0) {
        return (
          <div key={index} className="response-paragraph" dir="rtl">
            {renderMixedContent(segment)}
          </div>
        );
      } else {
        return (
          <div key={index} className="math-block" dir="ltr">
            <BlockMath math={segment.trim()} />
          </div>
        );
      }
    });
  };

  console.log(data);

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
      <a dir="ltr" href="#function-changes-response">
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
          <div className="response">{parseResponse(data)}</div>
        ) : (
          <div className="mt-[20px]">حدث خطأ, يرجى المحاولة لاحقا</div>
        )
      ) : null}
    </div>
  );
};

export default FunctionChanges;
