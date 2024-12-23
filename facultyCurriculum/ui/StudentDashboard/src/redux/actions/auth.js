import { types } from "./types";

export function loginDispatch(payload) {
  const { userName: UserName, Password } = payload;

  if (!UserName || !Password)
    throw new Error("not passing valid data to login");

  return {
    type: types.A_LOGIN,
    payload: {
      UserName,
      Password,
    },
  };
}

export function sendOtpDispatch(payload) {
  const { email } = payload;

  if (!email) throw new Error("not passing valid data to send Otp Dispatch");

  return {
    type: types.A_SEND_OTP,
    payload: { email },
  };
}

export function validateEmailDispatch(payload) {
  const { email } = payload;

  if (!email) throw new Error("not passing valid data to send Otp Dispatch");

  return {
    type: types.A_VALIDATE_EMAIL,
    payload: { email },
  };
}

export function changePasswordDispatch(payload) {
  const { email, password } = payload;

  if (!email || !password)
    throw new Error("not passing valid data to send Otp Dispatch");

  return {
    type: types.A_CHANGE_PASSWORD,
    payload: { email, password },
  };
}

export function resetPasswordDispatch(payload) {
  const { userMail, password } = payload;

  if (!userMail || !password)
    throw new Error("not passing valid data to reset password");

  return {
    type: types.A_RESET_PASSWORD,
    payload: { userMail, password },
  };
}

export function resetInitialPasswordDispatch(payload) {
  const { userMail, password, oldPassword } = payload;

  if (!userMail || !password || !oldPassword)
    throw new Error("not passing valid data to reset password");

  return {
    type: types.A_RESET_INITIAL_PASSWORD,
    payload: payload,
  };
}
