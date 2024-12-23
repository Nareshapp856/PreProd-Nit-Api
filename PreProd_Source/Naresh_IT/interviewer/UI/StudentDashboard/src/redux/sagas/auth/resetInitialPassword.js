import { put, call, takeLatest } from "redux-saga/effects";
import {
  requestInitialPasswordUpdate,
  initialPasswordUpdated,
  rejectInitialPasswordUpdate,
} from "../../slices/user/resetInitialPasswordSlice";
import { types } from "../../actions/types";
import { resetInitialPasswordApi } from "../../../services/api";

export function* resetInitialPasswordSaga(action) {
  try {
    yield put(requestInitialPasswordUpdate());

    const res = yield call(resetInitialPasswordApi, action.payload);

    yield put(initialPasswordUpdated(res.body));
  } catch (error) {
    console.log("err");
    if (error?.response?.status === 401) {
      yield put(
        rejectInitialPasswordUpdate({
          status: false,
          error: "please try again",
          errMsg:
            error.response?.data?.message ||
            "Something went wrong, please try again.",
        })
      );
    } else {
      yield put(
        rejectInitialPasswordUpdate({
          status: false,
          error: "please try again",
          errMsg: "Something went wrong, please try again.",
        })
      );
    }
  }
}

export function* resetInitialPasswordWatcherSaga() {
  yield takeLatest(types.A_RESET_INITIAL_PASSWORD, resetInitialPasswordSaga);
}
