import { types } from "./types";

export const ac_curriculumList = (payload) => ({
  type: types.AC_CURRICULUMLIST,
  payload,
});

export const ac_curriculumById = (payload) => ({
  type: types.AC_CURRICULUMBYID,
  payload,
});
