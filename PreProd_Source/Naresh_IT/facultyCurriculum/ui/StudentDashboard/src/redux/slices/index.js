import { combineReducers } from "@reduxjs/toolkit";
import {
  d_graphSlice,
  dailyTaskSlice,
  mcqsandprogramsSlice,
} from "./dashboard";
import {
  myP_graphSlice,
  myP_moduleGraphSlice,
  myP_moduleSlice,
  myP_subTopicSlice,
  myP_technologyGraphSlice,
  myP_technologySlice,
  myP_topicGraphSlice,
  myP_topicSlice,
} from "./dashboard/myPerformance";
import { userSlice } from "./user/userSlice";
import { loginSlice } from "./user/loginSlice";
import { programResultSlice } from "./result";
import {
  at_retrieveDetails,
  at_slotSlice,
  at_studentSlice,
  at_submitActionsSlice,
} from "./faculty/attendanceTracker";
import { mcqQuestionsSlice } from "./mcqexam";
import { resetPasswordSlice } from "./user/resetPasswordSlice";
import { forgotPasswordSlice } from "./user/forgotPasswordSlice";
import fc_facultyCurriculumListSlice from "./faculty/facultyCirriculum";
import ac_facultyCurriculumListSlice, {
  ac_facultyCurriculumSlice,
} from "./admin/curriculumListSlice";
import { resetInitialPasswordSlice } from "./user/resetInitialPasswordSlice";

export const rootReducer = combineReducers({
  // Auth
  user: userSlice.reducer,
  login: loginSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  resetInitialPassword: resetInitialPasswordSlice.reducer,

  // Dashboard
  dailyTasks: dailyTaskSlice.reducer,
  mcqsandprograms: mcqsandprogramsSlice.reducer,
  d_graph: d_graphSlice.reducer,

  //MyPerformance
  myP_graph: myP_graphSlice.reducer,
  myP_topicGraph: myP_topicGraphSlice.reducer,
  myP_moduleGraph: myP_moduleGraphSlice.reducer,
  myP_technologyGraph: myP_technologyGraphSlice.reducer,
  myP_technology: myP_technologySlice.reducer,
  myP_module: myP_moduleSlice.reducer,
  myP_topic: myP_topicSlice.reducer,
  myP_subTopic: myP_subTopicSlice.reducer,

  // Program
  programResults: programResultSlice.reducer,

  //Faculty
  //Home
  at_students: at_studentSlice.reducer,
  at_slots: at_slotSlice.reducer,
  at_submitActions: at_submitActionsSlice.reducer,
  at_retrieveDetails: at_retrieveDetails.reducer,
  fc_facultyCurriculumList: fc_facultyCurriculumListSlice,

  //Admin
  //Home
  ac_adminCurriculumList: ac_facultyCurriculumListSlice,
  ac_adminCurriculum: ac_facultyCurriculumSlice.reducer,

  // MCQExam
  mcq_questions: mcqQuestionsSlice.reducer,
});
