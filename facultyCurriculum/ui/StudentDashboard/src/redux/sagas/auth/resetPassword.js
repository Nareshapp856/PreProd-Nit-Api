import { put, call, takeLatest } from "redux-saga/effects";
import {
  requestPasswordUpdate,
  passwordUpdated,
  rejectPasswordUpdate,
} from "../../slices/user/resetPasswordSlice";
import { types } from "../../actions/types";
import { resetPasswordApi } from "../../../services/api";

export function* resetPasswordSaga(action) {
  try {
    yield put(requestPasswordUpdate());

    const res = yield call(resetPasswordApi, action.payload);

    yield put(passwordUpdated(res));
  } catch (error) {
    if (error?.response?.status === 401) {
      yield put(rejectPasswordUpdate(false));
    } else {
      yield put(
        rejectPasswordUpdate({ status: false, error: "please try again" })
      );
    }
  }
}

export function* resetPasswordWatcherSaga() {
  yield takeLatest(types.A_RESET_PASSWORD, resetPasswordSaga);
}
