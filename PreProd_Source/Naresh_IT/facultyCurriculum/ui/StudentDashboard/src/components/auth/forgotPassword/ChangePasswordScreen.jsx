import clsx from "clsx";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ChangePasswordScreen({
  setNewPwd,
  newPwd,
  confirmationPwd,
  setConfirmationPwd,
}) {
  const [confirmationFaild, setConfirmationFaild] = useState(false);
  const [pwdVisibility, setPwdVisibility] = useState(false);

  const mouseUpHandler = () => {
    setPwdVisibility(true);
  };

  const mouseDownHandler = () => {
    setPwdVisibility(false);
  };

  useEffect(() => {
    if (confirmationPwd) {
      if (confirmationPwd !== newPwd) {
        if (!confirmationFaild) setConfirmationFaild(true);
      } else if (confirmationPwd === newPwd) {
        setConfirmationFaild(false);
      }
    }
  }, [newPwd, confirmationPwd]);

  return (
    <div className="mt-2">
      <div className={clsx("w-full flex flex-col mt-2 relative")}>
        <label htmlFor="password" className="text-sm font-semibold">
          New Password
        </label>
        <input
          id="password"
          type={pwdVisibility ? "text" : "password"}
          name="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          placeholder="d*lx2DP"
          className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
        />
        <span
          className="absolute bottom-2 right-2 cursor-pointer z-10"
          onMouseDown={mouseUpHandler}
          onMouseUp={mouseDownHandler}
        >
          {pwdVisibility ? (
            <VisibilityIcon sx={{ color: "#070707", opacity: ".90" }} />
          ) : (
            <VisibilityOffIcon sx={{ color: "#070707", opacity: ".70" }} />
          )}
        </span>
      </div>
      <div className={clsx("w-full flex flex-col mt-2")}>
        <label htmlFor="password" className="text-sm font-semibold">
          Re-enter Password
          {confirmationFaild && (
            <span className="text-[.6rem] text-red-800">
              passwords doesn't match
            </span>
          )}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={confirmationPwd}
          onChange={(e) => setConfirmationPwd(e.target.value)}
          placeholder="d*lx2DP"
          className={clsx(
            "p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none",
            confirmationFaild && "border-2 border-red-800"
          )}
        />
      </div>
    </div>
  );
}

export default ChangePasswordScreen;
