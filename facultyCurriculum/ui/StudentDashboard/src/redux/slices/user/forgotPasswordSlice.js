import { getBasicGetSlice } from "../../util/get";

const baseSliceState = {
  isLoading: false,
  isError: false,
  error: null,
  data: null,
  state: "stale",
  status: null,
  isPending: false,
};

const baseState = {
  sendOtp: null,
  validOtp: null,
};

export const forgotPasswordSlice = getBasicGetSlice({
  sliceName: "forgotPassword",
  initialState: { ...baseState },
  reducers: {
    setVerificationMail(state, action) {
      state.sendOtp = action.payload.email;
    },
    resetForgotPasswordState(state) {
      state.sendOtp = baseState.sendOtp;
      state.validOtp = baseState.validOtp;
      state.isLoading = baseSliceState.isLoading;
      state.isError = baseSliceState.isError;
      state.error = baseSliceState.error;
      state.data = baseSliceState.data;
      state.state = baseSliceState.state;
      state.status = baseSliceState.status;
      state.isPending = baseSliceState.isPending;
    },
    sendOtp(state) {
      state.sendOtp = null;
    },
    otpSent(state, action) {
      state.sendOtp = action.payload;
    },
    requestVerifyOtp(state) {
      state.validOtp = null;
    },
    otpVerification(state, action) {
      state.validOtp = action.payload;
    },
  },
});

export const {
  sendOtp,
  otpSent,
  setVerificationMail,
  resetForgotPasswordState,
  requestVerifyOtp,
  otpVerification,
  fetchStart: requestPasswordUpdate,
  fetchSuccess: passwordUpdated,
  fetchError: rejectPasswordUpdate,
} = forgotPasswordSlice.actions;
