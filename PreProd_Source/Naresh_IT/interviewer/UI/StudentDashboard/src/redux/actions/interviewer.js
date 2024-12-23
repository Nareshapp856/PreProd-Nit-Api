import { types } from "./types";

export const registerInterviewerDispatch = (payload) => ({
  type: types.REGISTER_INTERVIEWER,
  payload,
});

export const submitEvolutionSheetDispatch = (payload) => ({
  type: types.SUBMIT_EVOLUTIONSHEET,
  payload,
});
