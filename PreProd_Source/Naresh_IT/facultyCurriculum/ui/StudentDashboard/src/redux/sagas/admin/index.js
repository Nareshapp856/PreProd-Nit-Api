import { takeLatest } from "redux-saga/effects";
import { types } from "../../actions/types";
import {
  fc_facultyCurriculumListSaga,
  fc_facultyCurriculumSaga,
} from "./facultyCurriculum";

export function* adminWatcherSaga() {
  yield takeLatest(types.AC_CURRICULUMLIST, fc_facultyCurriculumListSaga);
  yield takeLatest(types.AC_CURRICULUMBYID, fc_facultyCurriculumSaga);
}
