import { all } from "redux-saga/effects";
import { dashboardWatcherSaga } from "./dashboard";
import { authWatcherSaga } from "./auth";
import { resultsWatcherSaga } from "./result";
import { facultyWatcherSaga } from "./faculty";
import { reportWatcherSaga } from "./report";
import { mcqExamWatcherSaga } from "./mcqExam";
import { resetPasswordWatcherSaga } from "./auth/resetPassword";
import { resetInitialPasswordWatcherSaga } from "./auth/resetInitialPassword";
import { adminWatcherSaga as NOTTHEadminWatcherSaga } from "./admin";

export function* adminSaga() {
  yield all([
    dashboardWatcherSaga(),
    authWatcherSaga(),
    resultsWatcherSaga(),
    facultyWatcherSaga(),
    resultsWatcherSaga(),
    reportWatcherSaga(),
    mcqExamWatcherSaga(),
    resetPasswordWatcherSaga(),
    resetInitialPasswordWatcherSaga(),
    NOTTHEadminWatcherSaga(),
  ]);
}
