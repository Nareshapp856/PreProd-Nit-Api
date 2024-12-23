import { call, put } from "redux-saga/effects";
import {
  d_fetchGraphError,
  d_fetchGraphStart,
  d_fetchGraphSuccess,
} from "../../slices/dashboard";
import { d_graphApi } from "../../../services/api";

export function* d_graphSaga(action) {
  try {
    yield put(d_fetchGraphStart());

    const res = yield call(d_graphApi, action.payload);

    yield put(
      d_fetchGraphSuccess({
        data: res.data || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      d_fetchGraphError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}
