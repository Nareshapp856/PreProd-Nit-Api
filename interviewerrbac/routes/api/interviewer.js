const express = require("express");
const {
  registerInterviewer,
  insertEvolutionSheet,
  addInterviewerBatchMapping,
  fetchEvolutionSheetBatches,
  fetcInterviewers,
  fetchBatches,
  fetchStudentsByBatchId,
  fetchModulesByInterviewerId,
  fetchTopicsByModuleIdList,
  submitEvolutionSheet,
  registerUser,
  fetchInterviewersAndBatches,
  deleteMappedInterviewerBatches,
} = require("../../controllers/interviewer");

const router = express.Router();

router.post("/register-interviewer", registerInterviewer);
router.post("/registerUser",registerUser);

router.post("/insert-evolutionsheet", insertEvolutionSheet);

router.post("/insert-interviewerbatches", addInterviewerBatchMapping);

router.get("/fetch-batches", fetchEvolutionSheetBatches);

router.get("/fetch-interviewers", fetcInterviewers);


router.get("/fetch-batches/:id", fetchBatches);

router.get("/fetch-students/:id", fetchStudentsByBatchId);

router.get("/fetch-modules/:id", fetchModulesByInterviewerId);

router.post("/topicsbymodules", fetchTopicsByModuleIdList);

router.get("/fetchinterviewersandbatches", fetchInterviewersAndBatches);

router.delete("/mappedinterviewerbatches/:id", deleteMappedInterviewerBatches);

module.exports = router;
