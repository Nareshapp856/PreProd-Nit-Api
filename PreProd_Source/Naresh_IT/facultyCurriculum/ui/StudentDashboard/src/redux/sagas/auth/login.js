import { put, call } from "redux-saga/effects";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../slices/user/userSlice";
import { loginApi } from "../../../services/api";
import { SER_AO_INSTANCE } from "../../../services/auth/LoginObservers";

export function* loginSaga(action) {
  try {
    yield put(loginRequest());

    const res = yield call(loginApi, action.payload);

    // Yeah it could be Student or faculty but you will only see student here
    const {
      IsAuthenticated: isAuthenticated,
      UserName: userName,
      UserName: email,
      FirstName: firstName,
      LastName: lastName,
      BatchName: batchName,
      role: role,
    } = res.data;

    const data = res.data;

    const userId = data.studentId || data.FacultyId;

    console.log(userId);

    const statusCode = res.status;

    yield put(
      loginSuccess({
        isAuthenticated,
        userId,
        userName,
        firstName,
        lastName,
        email,
        statusCode,
        batchName,
        role,
      })
    );

    SER_AO_INSTANCE.SER_AO_D_login(res);
  } catch (error) {
    if (error.response?.status === 401) {
      yield put(
        loginFailure({
          error: {
            message: error.response?.data,
            status: error.response?.data?.success,
            isSuccessResponse: error?.response?.status,
          },
        })
      );
    } else {
      yield put(
        loginFailure({
          message: error.response?.data,
          status: error.response?.data?.success,
          isSuccessResponse: error.response?.status,
        })
      );
    }
  }
}
