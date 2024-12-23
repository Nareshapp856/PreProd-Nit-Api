function QuestionStatusLabel() {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <div className="w-3 h-3 bg-green-600"></div>
        <p>Attempted</p>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="w-3 h-3 bg-yellow-600"></div>
        <p>Attempted + Review</p>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="w-3 h-3 bg-blue-600"></div>
        <p>Attempted + Not Review Later</p>
      </div>

      <div className="flex items-center gap-x-2">
        <div className="w-3 h-3 bg-red-600"></div>
        <p>Not Attempted</p>
      </div>
    </>
  );
}

export default QuestionStatusLabel;
