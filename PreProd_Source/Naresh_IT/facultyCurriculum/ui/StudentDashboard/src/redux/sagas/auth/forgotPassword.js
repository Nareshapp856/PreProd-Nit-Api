import { put, call } from "redux-saga/effects";
import {
  VerifyOtpApi,
  changeUserPasswordApi,
  loginApi,
  sendOtpApi,
} from "../../../services/api";
import {
  otpSent,
  otpVerification,
  passwordUpdated,
  rejectPasswordUpdate,
  requestPasswordUpdate,
  requestVerifyOtp,
  sendOtp,
} from "../../slices/user/forgotPasswordSlice";

export function* sendOtpSaga(action) {
  try {
    yield put(sendOtp());

    yield call(sendOtpApi, action.payload);

    yield put(otpSent(true));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(otpSent(false));
      yield put(rejectPasswordUpdate({ status: false, error: "forbidden" }));
    } else {
      yield put(otpSent(false));
      rejectPasswordUpdate({ status: false, error: "please try again" });
    }
  }
}

export function* verifyOtpSaga(action) {
  try {
    yield put(requestVerifyOtp());

    const res = yield call(VerifyOtpApi, action.payload);

    yield put(otpVerification(true));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(otpVerification(false));
      yield put(rejectPasswordUpdate({ status: false, error: "forbidden" }));
    } else {
      yield put(otpVerification(false));
      yield put(
        rejectPasswordUpdate({ status: false, error: "please try again" })
      );
    }
  }
}

export function* changePasswordSaga(action) {
  try {
    yield put(requestPasswordUpdate());

    const res = yield call(changeUserPasswordApi, action.payload);

    yield put(passwordUpdated(true));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(rejectPasswordUpdate({ status: false, error: "forbidden" }));
    } else {
      yield put(
        rejectPasswordUpdate({ status: false, error: "please try again" })
      );
    }
  }
}
