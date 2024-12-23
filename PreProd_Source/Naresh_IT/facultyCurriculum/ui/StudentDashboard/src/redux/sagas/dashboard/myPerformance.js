import { call, put } from "redux-saga/effects";
import {
  myP_fetchGraphError,
  myP_fetchGraphStart,
  myP_fetchGraphSuccess,
  myP_fetchModleGraphError,
  myP_fetchModleGraphSuccess,
  myP_fetchModuleError,
  myP_fetchModuleGraphStart,
  myP_fetchModuleStart,
  myP_fetchModuleSuccess,
  myP_fetchTechnologyError,
  myP_fetchTechnologyGraphError,
  myP_fetchTechnologyGraphStart,
  myP_fetchTechnologyGraphSuccess,
  myP_fetchTechnologyStart,
  myP_fetchTechnologySuccess,
  myP_fetchTopicError,
  myP_fetchTopicGraphError,
  myP_fetchTopicGraphStart,
  myP_fetchTopicGraphSuccess,
  myP_fetchTopicStart,
  myP_fetchTopicSuccess,
} from "../../slices/dashboard/myPerformance";
import {
  myP_graphApi,
  myP_graphModuleApi,
  myP_graphTechnologyApi,
  myP_graphTopicApi,
  myP_moduleApi,
  myP_subTopicApi,
  myP_technologyApi,
  myP_topicApi,
} from "../../../services/api";

export function* myP__graphSaga(action) {
  try {
    yield put(myP_fetchGraphStart());

    const res = yield call(myP_graphApi, action.payload);

    yield put(
      myP_fetchGraphSuccess({
        data: res.data || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchGraphError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_topicGraphSaga(action) {
  try {
    yield put(myP_fetchTopicGraphStart());

    const res = yield call(myP_graphTopicApi, action.payload);

    yield put(
      myP_fetchTopicGraphSuccess({
        data: res.data || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchTopicGraphError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_moduleGraphSaga(action) {
  try {
    yield put(myP_fetchModuleGraphStart());

    const res = yield call(myP_graphModuleApi, action.payload);

    yield put(
      myP_fetchModleGraphSuccess({
        data: res.data || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchModleGraphError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_technologyGraphSaga(action) {
  try {
    yield put(myP_fetchTechnologyGraphStart());

    const res = yield call(myP_graphTechnologyApi, action.payload);

    yield put(
      myP_fetchTechnologyGraphSuccess({
        data: res.data || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchTechnologyGraphError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_technologySaga(action) {
  try {
    yield put(myP_fetchTopicStart());

    const res = yield call(myP_technologyApi, action.payload);

    yield put(
      myP_fetchTopicSuccess({
        data: res.data.dbresult || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchTopicError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_moduleSaga(action) {
  try {
    yield put(myP_fetchModuleStart());

    const res = yield call(myP_moduleApi, action.payload);

    yield put(
      myP_fetchModuleSuccess({
        data: res.data.dbresult || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchModuleError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_topicSaga(action) {
  try {
    yield put(myP_fetchTechnologyStart());

    const res = yield call(myP_topicApi, action.payload);

    yield put(
      myP_fetchTechnologySuccess({
        data: res.data.dbresult || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchTechnologyError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* myP_subTopicSaga(action) {
  try {
    yield put(myP_fetchTopicStart());

    const res = yield call(myP_subTopicApi, action.payload);

    yield put(
      myP_fetchTopicSuccess({
        data: res.data.dbresult || [],
        status: res.status || null,
      })
    );
  } catch (error) {
    yield put(
      myP_fetchTopicError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}
