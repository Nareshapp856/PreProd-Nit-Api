import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { mcqQuestionsDispatch } from "../../redux/actions/mcqQuestions";
import brand_logo from "../../assets/brand_logo.png";

import McqExamComponent from "../../components/mcqexam/McqExamComponent";
import Questions from "../../components/mcqexam/Questions";
import QuestionStatusLabel from "../../components/mcqexam/QuestionStatusLabel";

function McqExamPageComponent({ userName, questions, fetchQuestions }) {
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (Array.isArray(questions)) {
      setQuestionsList(
        questions.map((question, index) => ({
          ...question,
          color: index === 0 ? 1 : 0,
        }))
      );
      setSelectedQuestion({
        questionNumber: 0,
        question: questions[0],
        id: questions[0]?.QuestionID,
      });
    }
  }, [questions]);

  const onQuestionSelection = (questionId, index) => {
    setSelectedQuestion({
      questionNumber: index,
      question:
        questionsList.find((question) => question.QuestionID === questionId) ||
        {},
      id: questionId,
    });
  };

  const updateQuestionColorToGreen = (questionId) => {
    setQuestionsList((prev) => {
      const index = prev.findIndex(
        (question) => question.QuestionID === questionId
      );

      if (index !== -1) {
        const updatedQuestions = [...prev];

        updatedQuestions[index] = {
          ...updatedQuestions[index],
          color: 1,
        };

        return updatedQuestions;
      }

      return prev;
    });
  };

  const nextHandler = () => {
    setSelectedQuestion((prev) => {
      let index = prev.questionNumber + 1;
      if (index >= questions.length) index = 0;

      return {
        id: questions[index].QuestionID,
        question: questions[index],
        questionNumber: index,
      };
    });
  };

  const onReviewLater = (e) => {
    console.log(e);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="w-full h-[5rem] flex justify-between px-4 items-center bg-blue-800 bg-opacity-20 border-b border-b-black">
        <img width={220} className="" src={brand_logo} />
        <p>Welcome {userName}</p>
      </header>
      <main className="font-sans h-[560px] overflow-auto">
        <div className="flex h-full border-b-black border-b relative">
          <div className="max-h-full w-[16rem] overflow-y-auto border-r-black border-r">
            <Questions
              selectedQuestion={selectedQuestion}
              questions={questionsList}
              setQuestionsList={setQuestionsList}
              onQuestionSelection={onQuestionSelection}
            />
          </div>
          <div className="p-4 text-md font-medium overflow-y-auto">
            <div className="min-h-[460px]">
              {selectedQuestion && (
                <McqExamComponent
                  questionsList={questionsList}
                  selectedQuestion={selectedQuestion}
                  setQuestionsList={setQuestionsList}
                  questionId={selectedQuestion.id}
                  question={selectedQuestion.question}
                  questionNumber={selectedQuestion.questionNumber}
                />
              )}
            </div>

            <div className="flex justify-between mx-4">
              <div className="space-x-2 flex items-center  bottom-10 left-80">
                <input
                  id="reviewlater"
                  type="checkbox"
                  onClick={onReviewLater}
                />
                <label htmlFor="reviewlater">Review Later</label>
              </div>

              <button
                onClick={nextHandler}
                className=" bottom-10 right-20 w-[6.8rem] h-[2.2rem] text-white font-semibold bg-green-400 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-wrap justify-between mt-4 mx-16 gap-y-4">
        <div className="flex flex-wrap gap-x-6">
          <QuestionStatusLabel />
        </div>

        <button className="bg-red-400 w-40 h-10 font-semibold text-white rounded">
          Submit
        </button>
      </footer>
    </div>
  );
}

const mapState = (state) => ({
  userName: state.user.userName,
  questions: state.mcq_questions.data,
});

const mapDispatch = {
  fetchQuestions: mcqQuestionsDispatch,
};

const McqExamPage = connect(mapState, mapDispatch)(McqExamPageComponent);

export default McqExamPage;
