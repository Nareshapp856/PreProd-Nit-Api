import { types } from "./types";

export const mcqQuestionsDispatch = (payload) => {
  return {
    type: types.MCQ_QUESTION_LIST,
    payload,
  };
};
