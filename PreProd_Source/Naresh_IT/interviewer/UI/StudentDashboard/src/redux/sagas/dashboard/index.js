import { takeLatest } from "redux-saga/effects";
import { types } from "../../actions/types";
import { dailyTasksSaga } from "./dailyTasks";
import { mcqsandprogramsSaga } from "./retrieveTests";
import { d_graphSaga } from "./graph";
import {
  myP__graphSaga,
  myP_moduleGraphSaga,
  myP_moduleSaga,
  myP_subTopicSaga,
  myP_technologyGraphSaga,
  myP_technologySaga,
  myP_topicGraphSaga,
  myP_topicSaga,
} from "./myPerformance";

export function* dashboardWatcherSaga() {
  yield takeLatest(types.D_DAILY_TASKS_LIST, dailyTasksSaga);
  yield takeLatest(types.D_MCQANDPROGRAM_DATA, mcqsandprogramsSaga);
  yield takeLatest(types.D_GRAPH_DATA, d_graphSaga);
  yield takeLatest(types.D_GRAPH_DATA, d_graphSaga);
  yield takeLatest(types.MYP_GRAPH_DATA, myP__graphSaga);
  yield takeLatest(types.MYP_TOPIC_GRAPH_DATA, myP_topicGraphSaga);
  yield takeLatest(types.MYP_MODULE_GRAPH_DATA, myP_moduleGraphSaga);
  yield takeLatest(types.MYP_TECHNOLOGY_GRAPH_DATA, myP_technologyGraphSaga);
  yield takeLatest(types.MYP_TECHNOLOGY_LIST, myP_technologySaga);
  yield takeLatest(types.MYP_MODULE_LIST, myP_moduleSaga);
  yield takeLatest(types.MYP_TOPIC_LIST, myP_topicSaga);
  yield takeLatest(types.MYP_SUBTOPIC_LIST, myP_subTopicSaga);
}
