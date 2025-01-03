// Import the utility function
import { getBasicGetSlice } from "../../util/get";

// Create the slice
export const fc_facultyCurriculumListSlice = getBasicGetSlice({
  sliceName: "fc_facultyCurriculumList",
});

// Export the actions generated by the slice
export const {
  fetchStart: fetchFacultyCurriculumListStart,
  fetchSuccess: fetchFacultyCurriculumListSuccess,
  fetchError: fetchFacultyCurriculumListError,
  resetSlice: resetFacultyCurriculumList,
  // Add other actions if any were provided in moreReducers
} = fc_facultyCurriculumListSlice.actions;

// Export the reducer to be used in the store
export default fc_facultyCurriculumListSlice.reducer;
