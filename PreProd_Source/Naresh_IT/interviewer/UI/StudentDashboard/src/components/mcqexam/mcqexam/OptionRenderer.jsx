function OptionRenderer({ value, primary, onValueChange, selectedAnswer }) {
  return (
    <div className="space-x-2">
      <input
        id={value}
        type="radio"
        name="options"
        value={value}
        checked={selectedAnswer === value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      <label htmlFor={value}>{primary}</label>
    </div>
  );
}

export default OptionRenderer;
