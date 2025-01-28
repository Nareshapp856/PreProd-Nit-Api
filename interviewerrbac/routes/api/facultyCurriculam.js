const express = require("express");
const {
  insertfacultycurriculam,
  getbasicdetails,
  getCurriculumDetails,
  updatefacultycurriculum,
  insertupdatecoursebatchdetails,
  getfacultycurriculumdetails,
  gettCurriculumNameByfacultyid,
  getCourseBatchDetails,
  getCourseDetailsByCurriculumId,
  updateStatusByCurriculumId,
  adminUpdateCourseStatus,
  gettopicidbymodule,
  getSubTopicIdIdByTopics,
  getmodulesbyfacultyid,
  addTopic,
  addSubTopic,
  fetchBatchList,
  fetchFacultyList,
  fetchTechnologylist,
  fetchAssignedBatches,
  submitPendingApproval,
  fetchApprovedBatchList,
  fetchAssignedCurriculum,
  updateAssignedCurriculum,
  updateAssignedBatchStatus,
  fetchAssignedBatchDetails,
  assignCurriculumToFaculty,
  fetchApprovedCurriculumList,
  fetchAssignedCurriculumList,
  submitFacultyBatchAssignment,
  deleteAssignedCurriculum,
  fetchAdminAssignedBatches,
  deleteAssignedBatchByBatchApproval,
} = require("../../controllers/facultyCurriculamController");

const router = express.Router();

router.post("/addtopic", addTopic);

router.post("/addsubtopic", addSubTopic);

router.get("/batchlist", fetchBatchList);

router.get("/approvedbatchlist", fetchApprovedBatchList);

router.get("/technologylist", fetchTechnologylist);

router.get("/facultylist", fetchFacultyList);

router.get("/fetchassignedbatches", fetchAssignedBatches);

router.get("/assignedcurriculumList", fetchAssignedCurriculumList);

router.post("/assigncurriculumtofaculty", assignCurriculumToFaculty);

router.get("/fetchapprovedcurriculumlist", fetchApprovedCurriculumList);

router.get("/assignedCurriculum", fetchAssignedCurriculum);

router.delete("/assignedCurriculum/:id", deleteAssignedCurriculum);

router.delete(
  "/assigned-batch-approval/:id",
  deleteAssignedBatchByBatchApproval
);

router.get("/assignedBatchDetails/:id", fetchAssignedBatchDetails);

router.post("/submitpendingapproval", submitPendingApproval);

router.put("/updateassignedcurriculum", updateAssignedCurriculum);

router.put("/updateassignedbatchstatus", updateAssignedBatchStatus);

router.post("/submitfacultybatchassignment", submitFacultyBatchAssignment);

router.post("/insertfacultycurriculam", insertfacultycurriculam);

router.post("/getbasicdetails", getbasicdetails);

router.post("/getcurriculamdetails", getCurriculumDetails);

router.post("/updatefacultycurriculum", updatefacultycurriculum);

router.post("/insertupdatecoursebatchdetails", insertupdatecoursebatchdetails);

router.post("/getfacultycurriculumdetails", getfacultycurriculumdetails);

router.post("/gettCurriculumNameByfacultyid", gettCurriculumNameByfacultyid);

router.post("/getCourseBatchDetails", getCourseBatchDetails);

router.post("/getcoursedetailsbycurriculumid", getCourseDetailsByCurriculumId);

router.post("/updatestatusbycurriculum", updateStatusByCurriculumId);

router.post("/admin_updateCourseStatus", adminUpdateCourseStatus);

router.post("/gettopicidbymodule", gettopicidbymodule);

router.post("/getSubTopicIdIdByTopics", getSubTopicIdIdByTopics);

router.get("/getmodulesbyfacultyid/:facultyId", getmodulesbyfacultyid);

router.get("/fetchAdminAssignedBatches", fetchAdminAssignedBatches);

module.exports = router;
