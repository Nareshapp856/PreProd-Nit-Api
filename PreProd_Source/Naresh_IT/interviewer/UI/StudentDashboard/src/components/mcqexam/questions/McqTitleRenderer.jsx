import { useEffect, useRef } from "react";

function McqTitleRenderer({ selectedQuestion, index }) {
  const questionRef = useRef(null);

  useEffect(() => {
    if (selectedQuestion?.questionNumber === index) {
      questionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedQuestion, index]);

  return <span ref={questionRef}>Question {index + 1}</span>;
}

export default McqTitleRenderer;
