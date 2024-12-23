import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { resetInitialPasswordDispatch } from "../../../redux/actions/auth";
import InputElement from "../../../ui/common/InputElement";
import clsx from "clsx";

function ResetPasswordFormComponent({
  initialResetState,
  errMsg,
  resetPassword,
}) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const userMail = query.get("e");

  useEffect(() => {
    console.log(initialResetState);
    if (initialResetState === "response") {
      navigate("/login");
    }
  }, [initialResetState]);

  const [formData, setFormData] = useState({
    oldpwd: "",
    newpwd: "",
    confirmpwd: "",
  });
  const [pwdConfirmation, setPwdConfirmation] = useState(true);

  useEffect(() => {
    if (formData.confirmpwd && formData.newpwd !== formData.confirmpwd) {
      if (pwdConfirmation) setPwdConfirmation(false);
    } else if (formData.newpwd === formData.confirmpwd) {
      if (!pwdConfirmation) setPwdConfirmation(true);
    }
  }, [formData.newpwd, formData.confirmpwd]);

  const submitHandler = () => {
    resetPassword({
      oldPassword: formData.oldpwd,
      userMail,
      password: formData.newpwd,
    });
  };

  const onFormValueChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-8 px-5 flex flex-col text-[#070707] montserrat-md">
      <h1
        className={clsx(
          "w-ful text-center text-[2rem]",
          errMsg ? "mb-2" : "mb-6"
        )}
      >
        Reset Password
      </h1>

      <div className="text-base">
        {initialResetState === "reject" && (
          <p className="text-red-800 text-center text-sm">
            {true ? errMsg : "Something went wrong, please retry."}
          </p>
        )}

        <div className="space-y-6">
          <InputElement
            label="Old Password"
            id="oldpwd"
            type="password"
            name="oldpwd"
            placeholder="Enter your old password"
            value={formData.oldpwd}
            onChange={onFormValueChange}
          />

          <InputElement
            eye={true}
            label="New Password"
            id="newpwd"
            type="password"
            name="newpwd"
            placeholder="Enter your new password"
            value={formData.newpwd}
            onChange={onFormValueChange}
          />

          <InputElement
            label="Confirm Password"
            id="confirmpwd"
            type="password"
            name="confirmpwd"
            placeholder="Confirm your new password"
            value={formData.confirmpwd}
            onChange={onFormValueChange}
            error={!pwdConfirmation}
          />
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={submitHandler}
            disabled={
              !formData.oldpwd ||
              !formData.newpwd ||
              !formData.confirmpwd ||
              formData.newpwd !== formData.confirmpwd
            }
            className="text-lg w-[12rem] h-[2.6rem] bg-blue-800 bg-opacity-[.14] hover:bg-opacity-[.18] rounded border-b-[#070707] border-b-2 cursor-pointer"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  initialResetState: state.resetInitialPassword.state,
  errMsg: state.resetInitialPassword.errMsg,
});

const mapDispatch = {
  resetPassword: resetInitialPasswordDispatch,
};

const ResetPasswordForm = connect(
  mapState,
  mapDispatch
)(ResetPasswordFormComponent);

export default ResetPasswordForm;
