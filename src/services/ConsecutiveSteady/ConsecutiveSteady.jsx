import React, { createRef, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "../Services.css";
import useFetch from "../../hooks/useFetch";
import { useInfo } from "../../../context/InfoContext";
import { IoInformationCircleOutline } from "react-icons/io5";
import { InlineMath, BlockMath } from "react-katex";
// study the changes of f(x) = (2x² + x + 7)/(x+1) and organize a table of them and translate the whole answer to arabic without showing the english response
const ConsecutiveSteady = () => {
  const consecutiveRef = useRef();
  const [cons, setCons] = useState("");
  const { data, loading, error, fetchData } = useFetch();
  const [requestAgain, setRequestAgain] = useState(0);
  const { toggleInfo } = useInfo();
  const katexOptions = {
    output: "html",
    strict: false,
    trust: false,
    maxSize: Infinity,
    maxExpand: 1000,
    throwOnError: true,
    errorColor: "#cc0000",
    macros: {},
    lineBreak: true, // Enable line breaks
  };

  useEffect(() => {
    if (cons.length > 0 && requestAgain) {
      fetchData(
        ` باللغة العربية. التزم بالتعليمات التالية بدقة تامة:

1.  **التنسيق الرياضي:**
    *   استخدم & قبل وبعد أي **رمز رياضي أو تعبير جبري قصير** مدمج في سياق الجملة. أمثلة: &\(n\ge0\)&, &&, &Un = 0&.
    *   استخدم $ قبل وبعد أي **معادلة أو صيغة رياضية رئيسية** تحتاج سطراً مستقلاً (مثل النهايات، إيجاد المشتقة الرئيسية، مقارنات).
    *   **هام:** إذا كانت الصيغة الرياضية (مثل المشتقة &\(U_{n+1}-U_n = \sqrt{3n+4}-\sqrt{3n+1}>0\)&) قصيرة ويمكن دمجها في جملة، استخدم & بدلاً من $. استخدم $ فقط للصيغ التي تتطلب سطرها الخاص.
    *   وتأكد أن لا يكون هناك عبارتان رياضيتان متتاليتان (أي لا يجب أن يكون هناك عبارتان محوطان ب& أو $ خلف بعض)(أي مرة نص عربي ومرة نص رياضي)
    * لا تستخدم أي علامات أو تنسيقات أخرى.

2.  **المحتوى المطلوب:**
    * ادرس اطراد المتتالية (Un)n>=0: ${cons} (متزايدة أو متناقصة أو ثابتة) وفق أحد هذه المعايير الثلاثة: 1: معيار الفرق Un+1 - Un, 2: معيار النسبة: Un+1/Un 3: معيار التابع (أي يمكن كتاية المتتالية بصيغة تابع ودراسة اطراده, استعمل المعيار الأسهل (لا داعي لتحلها بكل المعايير), ولكن إن أمكن كتابتها بصيغة تابع حلها باستخدام معيار التابع حتى إن لم يكن الأسهل`
      );
    }
  }, [cons, requestAgain]);
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
            <InlineMath settings={katexOptions} math={part.trim()} />
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
            <InlineMath settings={katexOptions} math={segment.trim()} />
          </div>
        );
      }
    });
  };

  return (
    <div className="container section-padding func-changes-container">
      <div className="flex fade-in fade-in-1 justify-start max-sm:justify-between items-center">
        <h1 className="header fade-in fade-in-1">دراسة اطراد متتالية: </h1>
        <IoInformationCircleOutline
          className="text-2xl text-gray-500 cursor-pointer mr-[20px]"
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
                <br />
                <p>لكتابة متتالية بصيغة الحد العام: </p>
                <p>Un = √(3n + 1)</p>
                <p>لكتابة متتالية بالتدريج: </p>
                <p>U0 = 1, Un+1 = 2Un</p>
                <p>لكتابة متتالية مجاميع: </p>
                <p>Un = 1/(n+1) + 1/(n+2) + ,,, + 1/2n</p>
              </div>
            );
          }}
        />
      </div>

      <div className="main-form fade-in fade-in-2 max-sm:flex-row">
        <h2 className="mb-[10px]">المتتالية:</h2>
        <div className="flex gap-[10px] ">
          <div className="main-input">
            <input dir="ltr" ref={consecutiveRef} />
            <div></div>
          </div>
          <h2 dir="ltr">(Un)n≥0:</h2>
        </div>
      </div>
      <div className="shortcuts fade-in fade-in-3">
        <button
          onClick={() => {
            consecutiveRef.current.value = consecutiveRef.current.value + "²";
            consecutiveRef.current.focus();
          }}
        >
          ²
        </button>
        <button
          onClick={() => {
            consecutiveRef.current.value = consecutiveRef.current.value + "³";
            consecutiveRef.current.focus();
          }}
        >
          ³
        </button>
        <button
          onClick={() => {
            consecutiveRef.current.value = consecutiveRef.current.value + "√";
            consecutiveRef.current.focus();
          }}
        >
          √
        </button>
      </div>
      <a dir="ltr" href="#function-changes-response">
        <button
          className={`generate gradient fade-in fade-in-4 `}
          onClick={() => {
            if (!consecutiveRef.current.value.length == 0) {
              setCons(consecutiveRef.current.value);
              setRequestAgain(requestAgain + 1);
            }
          }}
        >
          {requestAgain ? "reGenerate" : "Generate"}
        </button>
      </a>

      {requestAgain ? (
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
            <p>إذا كان الجواب غير واضح أو فيه رموز غريبة جرب إعادة المحاولة</p>
            <br />
            {parseResponse(data)}
          </div>
        ) : (
          <div className="mt-[20px]">حدث خطأ, يرجى المحاولة لاحقا</div>
        )
      ) : null}
    </div>
  );
};

export default ConsecutiveSteady;
