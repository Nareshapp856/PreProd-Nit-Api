import { call, put } from "redux-saga/effects";
import {
  fetchFacultyCurriculumListError,
  fetchFacultyCurriculumListStart,
  fetchFacultyCurriculumListSuccess,
} from "../../slices/faculty/facultyCirriculum";
import { fc_facultyCurriculumListApi } from "../../../services/api";

export function* fc_facultyCurriculumListSaga(action) {
  try {
    yield put(fetchFacultyCurriculumListStart());

    const res = yield call(fc_facultyCurriculumListApi, action.payload);

    yield put(fetchFacultyCurriculumListSuccess(res));
  } catch (error) {
    yield put(
      fetchFacultyCurriculumListError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}
