import { takeLatest } from "redux-saga/effects";
import { types } from "../../actions/types";
import { loginSaga } from "./login";
import {
  changePasswordSaga,
  sendOtpSaga,
  verifyOtpSaga,
} from "./forgotPassword";

export function* authWatcherSaga() {
  yield takeLatest(types.A_LOGIN, loginSaga);
  yield takeLatest(types.A_SEND_OTP, sendOtpSaga);
  yield takeLatest(types.A_VALIDATE_EMAIL, verifyOtpSaga);
  yield takeLatest(types.A_CHANGE_PASSWORD, changePasswordSaga);
}
