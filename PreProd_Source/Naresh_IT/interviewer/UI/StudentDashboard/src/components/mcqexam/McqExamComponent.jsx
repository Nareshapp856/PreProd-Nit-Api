import { connect } from "react-redux";
import McqQuestionRenderer from "./mcqexam/McqQuestionRenderer";
import { useEffect, useState } from "react";

function McqExamComponent({
  questionsList,
  questionId,
  selectedQuestion,
  setQuestionsList,
  question,
  questionNumber,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(
    questionsList.find((question) => question.QuestionID === questionId).Answer
  );

  useEffect(() => {
    setSelectedAnswer(
      questionsList.find((question) => question.QuestionID === questionId)
        .Answer
    );
  }, [selectedQuestion]);

  const onValueChange = (value) => {
    setSelectedAnswer(value);
    setQuestionsList((prev) => {
      const index = prev.findIndex(
        (question) => question.QuestionID === questionId
      );

      if (index !== -1) {
        const updatedQuestions = [...prev];

        updatedQuestions[index] = {
          ...updatedQuestions[index],
          Answer: value,
        };

        return updatedQuestions;
      }

      return prev;
    });
  };

  return (
    <>
      <McqQuestionRenderer
        selectedAnswer={selectedAnswer}
        setQuestionsList={setQuestionsList}
        question={question}
        onValueChange={onValueChange}
        questionNumber={questionNumber}
      />
    </>
  );
}

const mapState = (state) => ({});

const mapDispatch = {};

const McqExam = connect(mapState, mapDispatch)(McqExamComponent);

export default McqExam;
