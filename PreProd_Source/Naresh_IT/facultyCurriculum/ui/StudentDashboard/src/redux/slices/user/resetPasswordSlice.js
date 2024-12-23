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

export const resetPasswordSlice = getBasicGetSlice({
  sliceName: "resetPassword",
  reducers: {
    // i'm conscious when i'm naming this slice
    resetResetPasswordState(state) {
      state.isLoading = baseSliceState.isLoading;
      state.isError = baseSliceState.isError;
      state.error = baseSliceState.error;
      state.data = baseSliceState.data;
      state.state = baseSliceState.state;
      state.status = baseSliceState.status;
      state.isPending = baseSliceState.isPending;
    },
  },
});

export const {
  resetResetPasswordState,
  fetchStart: requestPasswordUpdate,
  fetchSuccess: passwordUpdated,
  fetchError: rejectPasswordUpdate,
} = resetPasswordSlice.actions;
