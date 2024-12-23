import clsx from "clsx";
import McqTitleRenderer from "./questions/McqTitleRenderer";
import { ColorStoreClass } from "../../services/mcqExam/colorStoreService";

const ColorStore = new ColorStoreClass();

function Questions({
  selectedQuestion,
  questions,
  setQuestionsList,
  onQuestionSelection,
}) {
  return (
    <div>
      <ul className="flex flex-col items-center gap-y-2 my-4">
        {questions.map((question, index) => (
          <li
            key={question.QuestionID}
            className={clsx(
              "w-[12rem] h-10 grid place-content-center cursor-pointer rounded font-semibold text-white",
              selectedQuestion.questionNumber === index
                ? "bg-fuchsia-400"
                : ColorStore.getColor(question?.color, question, index) ||
                    "bg-gray-500"
            )}
            onClick={() => onQuestionSelection(question.QuestionID, index)}
          >
            <McqTitleRenderer
              selectedQuestion={selectedQuestion}
              question={question}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
