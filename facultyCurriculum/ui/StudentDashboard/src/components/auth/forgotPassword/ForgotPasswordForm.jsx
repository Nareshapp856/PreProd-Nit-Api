import clsx from "clsx";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import {
  changePasswordDispatch,
  sendOtpDispatch,
  validateEmailDispatch,
} from "../../../redux/actions/auth";
import { useState, useEffect } from "react";
import { resetForgotPasswordState } from "../../../redux/slices/user/forgotPasswordSlice";

import OtpScreen from "./OtpScreen";
import EmailScreen from "./EmailScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";

const baseState = {
  email: "",
  otp: "",
  showOtpInput: false,
  faildToSendOtp: false,
  showChangePassword: false,
  showNetworkErr: false,
  newPwd: "",
  confirmationPwd: "",
};

function ForgotPasswordFormComponent({
  otpState,
  resetSlice,
  sendOtp,
  validateOtp,
  isOtpValid,
  validateEmail,
  changePassword,
  forgotPasswordState,
}) {
  const [email, setEmail] = useState(baseState.email);
  const [showNetworkErr, setShowNetworkErr] = useState(
    baseState.showNetworkErr
  );
  const [otp, setOtp] = useState(baseState.otp);
  const [showOtpInput, setShowOtpInput] = useState(baseState.showOtpInput);
  const [faildToSendOtp, setFaildToSendOtp] = useState(
    baseState.faildToSendOtp
  );
  const [showChangePassword, setShowChangePassword] = useState(
    baseState.showChangePassword
  );
  const [newPwd, setNewPwd] = useState(baseState.newPwd);
  const [confirmationPwd, setConfirmationPwd] = useState(
    baseState.confirmationPwd
  );
  useEffect(() => {
    if (forgotPasswordState === "response") {
      resetForgotPasswordState();
      navigate("/login");
    } else if (forgotPasswordState === "reject") {
      setShowNetworkErr("Please Try again.");
    } else {
      setShowNetworkErr(false);
    }
  }, [forgotPasswordState]);

  useEffect(() => {
    setEmail(baseState.email);
    setOtp(baseState.otp);
    setShowOtpInput(baseState.showOtpInput);
    setFaildToSendOtp(baseState.faildToSendOtp);
    setShowChangePassword(baseState.showChangePassword);
    setNewPwd(baseState.newPwd);
    setConfirmationPwd(baseState.confirmationPwd);
    resetSlice();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (otpState === true) {
      setShowOtpInput(true);
    } else if (otpState === false) {
      setFaildToSendOtp(true);
    }
  }, [otpState]);

  useEffect(() => {
    if (isOtpValid) {
      setShowChangePassword(true);
    }
  });

  useEffect(() => {
    if (faildToSendOtp) {
      setFaildToSendOtp(Boolean(!email));
    }
  }, [email]);

  useEffect(() => {
    if (showNetworkErr) {
      setShowNetworkErr(false);
    }
  }, [email, otp, newPwd, changePassword]);

  const submitHandler = () => {
    if (!email) {
      setShowNetworkErr("Please enter a valid email");
      return;
    }

    if (showOtpInput && (!otp || otp.length < 6)) {
      setShowNetworkErr("Please enter valid OTP");
      return;
    }

    if (showChangePassword && (!newPwd || !confirmationPwd)) {
      setShowNetworkErr("Please enter valid pwd");
      return;
    }

    if (showChangePassword) {
      changePassword({ email, password: newPwd });
    } else {
      if (showOtpInput) {
        validateOtp({ email, otp });
      } else {
        sendOtp({ email });
      }
    }
  };

  const navigationHandler = () => {
    if (showChangePassword) {
      setShowChangePassword(false);
      setShowOtpInput(true);
      setShowNetworkErr(false);
    } else if (showOtpInput) {
      setShowOtpInput(false);
      setShowNetworkErr(false);
    }
  };

  return (
    <div
      className={clsx(
        "py-6 px-4 flex flex-col text-[#070707] montserrat-md",
        (!showOtpInput || !showChangePassword) && "py-8"
      )}
    >
      {(showOtpInput || showChangePassword) && (
        <button className="w-10" onClick={navigationHandler}>
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      )}
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Password Reset</h1>
        {!showChangePassword && (
          <p
            className={clsx(
              "text-sm text-center flex flex-col",
              !showOtpInput ? "mb-8" : "mb-0"
            )}
          >
            {showOtpInput ? (
              <>
                <span>Enter OTP that has been sent to your mail</span>
                <span>OTP validation expires after 2mins.</span>
              </>
            ) : (
              "Enter your email to receive an OTP for verification."
            )}
          </p>
        )}

        {!showOtpInput ? (
          <EmailScreen
            faildToSendOtp={faildToSendOtp}
            email={email}
            setEmail={setEmail}
          />
        ) : showChangePassword ? (
          <ChangePasswordScreen
            newPwd={newPwd}
            setNewPwd={setNewPwd}
            confirmationPwd={confirmationPwd}
            setConfirmationPwd={setConfirmationPwd}
          />
        ) : (
          <OtpScreen otp={otp} setOtp={setOtp} />
        )}

        <div
          className={clsx(
            "flex flex-col items-center justify-center mt-6",
            !showNetworkErr && "mt-8"
          )}
        >
          {showNetworkErr && (
            <p className="text-red-800 text-sm mb-2">{showNetworkErr}</p>
          )}

          <button
            onClick={submitHandler}
            className={clsx(
              "text-lg h-[2.6rem] bg-blue-800 bg-opacity-[.14] hover:bg-opacity-[.18] rounded border-b-[#070707] border-b-2 cursor-pointer",
              showChangePassword ? "w-[14rem]" : "w-40"
            )}
          >
            {showChangePassword
              ? "Change Password"
              : showOtpInput
              ? "Verify OTP"
              : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  isOtpValid: state.forgotPassword.validOtp,
  // either backend send mail or not
  otpState: state.forgotPassword.sendOtp,
  forgotPasswordState: state.forgotPassword.state,
});

const mapDispatch = {
  sendOtp: sendOtpDispatch,
  validateOtp: validateEmailDispatch,
  validateEmail: validateEmailDispatch,
  changePassword: changePasswordDispatch,
  resetSlice: resetForgotPasswordState,
};

const ForgotPasswordForm = connect(
  mapState,
  mapDispatch
)(ForgotPasswordFormComponent);

export default ForgotPasswordForm;
