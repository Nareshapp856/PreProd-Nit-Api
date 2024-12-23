import OptionRenderer from "./OptionRenderer";

function McqQuestionRenderer({
  selectedAnswer,
  question,
  questionNumber,
  onValueChange,
}) {
  const {
    QuestionDescription,
    OptionA,
    OptionB,
    OptionC,
    OptionD,
    OptionE,
    OptionF,
  } = question;

  return (
    <>
      <pre className="text-lg pb-2 font-semibold font-sans">
        Q{questionNumber + 1 + ") "} {QuestionDescription}
      </pre>

      <div className="space-y-2 mt-6 ms-2">
        {OptionA && (
          <OptionRenderer
            value="optionA"
            primary={OptionA}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
        {OptionB && (
          <OptionRenderer
            value="optionB"
            primary={OptionB}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
        {OptionC && (
          <OptionRenderer
            value="optionC"
            primary={OptionC}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
        {OptionD && (
          <OptionRenderer
            value="optionD"
            primary={OptionD}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
        {OptionE && (
          <OptionRenderer
            value="optionE"
            primary={OptionE}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
        {OptionF && (
          <OptionRenderer
            value="optionF"
            primary={OptionF}
            onValueChange={onValueChange}
            selectedAnswer={selectedAnswer}
          />
        )}
      </div>
    </>
  );
}

export default McqQuestionRenderer;
