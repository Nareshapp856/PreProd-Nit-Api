import { getBasicGetSlice } from "../../util/get";

export const mcqQuestionsSlice = getBasicGetSlice({
  sliceName: "mcq_questions",
});

export const {
  fetchStart: fetchMcqQuestionsRequest,
  fetchSuccess: fetchMcqQuestionsSuccess,
  fetchError: fetchMcqQuestionsError,
  resetSlice: resetMcqQuestionsState,
} = mcqQuestionsSlice.actions;
