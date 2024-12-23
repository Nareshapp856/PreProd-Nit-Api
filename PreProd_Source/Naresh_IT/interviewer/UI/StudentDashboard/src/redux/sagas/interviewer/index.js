import { takeLatest } from "redux-saga/effects";
import { types } from "../../actions/types";

import { call, put } from "redux-saga/effects";
import {
  requestRegisterInterviewer,
  registerInterviewerSuccess,
  rejectRegisterInterviewer,
  submitEvolutionSheetStart,
  submitEvolutionSheetSuccess,
  submitEvolutionSheetError,
} from "../../slices/user/interviewer";
import {
  registerInterviewerAPI,
  submitEvolutionSheetAPI,
} from "../../../services/api";

export function* registerInterviewerSaga(action) {
  try {
    yield put(requestRegisterInterviewer());

    const res = yield call(registerInterviewerAPI, action.payload);
    console.log(res);
    yield put(registerInterviewerSuccess(res));
  } catch (error) {
    yield put(
      rejectRegisterInterviewer({
        error: {
          error: error?.response?.data?.error || error.name,
          code: error?.response?.status || 999,
          message: error?.response?.data?.message || error.message,
        },
      })
    );
  }
}

export function* submitEvolutionSheetSaga(action) {
  try {
    yield put(submitEvolutionSheetStart());

    const res = yield call(submitEvolutionSheetAPI, action.payload);

    yield put(submitEvolutionSheetSuccess(res));
  } catch (error) {
    yield put(
      submitEvolutionSheetError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* interviewerWatcherSaga() {
  yield takeLatest(types.REGISTER_INTERVIEWER, registerInterviewerSaga);
  yield takeLatest(types.SUBMIT_EVOLUTIONSHEET, submitEvolutionSheetSaga);
}
