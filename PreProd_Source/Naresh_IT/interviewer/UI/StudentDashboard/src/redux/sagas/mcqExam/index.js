import { types } from "../../actions/types";
import { mcqQuestionsApi } from "../../../services/api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMcqQuestionsError,
  fetchMcqQuestionsRequest,
  fetchMcqQuestionsSuccess,
} from "../../slices/mcqexam";

export function* mcaQuestionsSaga(action) {
  try {
    yield put(fetchMcqQuestionsRequest());

    const res = yield call(mcqQuestionsApi, action.payload);

    yield put(fetchMcqQuestionsSuccess(res));
  } catch (error) {
    yield put(
      fetchMcqQuestionsError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* mcqExamWatcherSaga() {
  yield takeLatest(types.MCQ_QUESTION_LIST, mcaQuestionsSaga);
}
