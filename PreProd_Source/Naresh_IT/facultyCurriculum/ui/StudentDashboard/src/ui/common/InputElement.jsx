import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";

function InputElement({
  eye = false,
  error = false,
  value,
  onChange,
  type,
  placeholder,
  name,
  id,
  label,
  containerCN = "w-full flex flex-col relative",
  labelCN = "mb-2",
  inputCN = "p-2 bg-blue-800 bg-opacity-[.07] rounded border-b-2 outline-none",
}) {
  const [visibility, setVisibility] = useState(false);

  const mouseUpHandler = () => {
    setVisibility(true);
  };

  const mouseDownHandler = () => {
    setVisibility(false);
  };

  return (
    <div className={containerCN}>
      <label htmlFor={id} className={labelCN}>
        {label}
      </label>
      <input
        id={id}
        type={visibility ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          inputCN,
          error ? "border-red-800" : " border-b-[#070707]"
        )}
      />
      {eye && (
        <span
          className="absolute bottom-2 right-2 cursor-pointer z-10"
          onMouseDown={mouseUpHandler}
          onMouseUp={mouseDownHandler}
        >
          {visibility ? (
            <VisibilityIcon sx={{ color: "#070707", opacity: ".90" }} />
          ) : (
            <VisibilityOffIcon sx={{ color: "#070707", opacity: ".70" }} />
          )}
        </span>
      )}
    </div>
  );
}

export default InputElement;
