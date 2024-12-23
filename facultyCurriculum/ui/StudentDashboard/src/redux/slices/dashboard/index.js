import { getBasicGetSlice } from "../../util/get";

export const dailyTaskSlice = getBasicGetSlice({
  sliceName: "d_dailyTasks",
});

export const mcqsandprogramsSlice = getBasicGetSlice({
  sliceName: "d_macqandprogram",
});

export const d_graphSlice = getBasicGetSlice({
  sliceName: "d_graph",
});

export const {
  fetchStart: fetchDialyTasksStart,
  fetchSuccess: fetchDialyTasksSuccess,
  fetchError: fetchDialyTasksError,
} = dailyTaskSlice.actions;

export const {
  fetchStart: fetchMcqAndProgramStart,
  fetchSuccess: fetchMcqAndProgramSuccess,
  fetchError: fetchMcqAndProgramError,
} = mcqsandprogramsSlice.actions;

export const {
  fetchStart: d_fetchGraphStart,
  fetchSuccess: d_fetchGraphSuccess,
  fetchError: d_fetchGraphError,
} = d_graphSlice.actions;
