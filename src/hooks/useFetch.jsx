export default useFetch;
import { GoogleGenAI } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai";

import { useState, useEffect } from "react";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyATXhR0phR-_uyGECwHH-D-jUEOBUeMYEY",
});

export function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
      });
      setData(response.text);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
