import clsx from "clsx";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { connect } from "react-redux";

import FileUpload from "./createCurriculum/FileUpload";
import TableofApproval from "./createCurriculum/TableofApproval";
import {
  ac_curriculumByIDApi,
  getModulesByFacultyId,
} from "../../services/api";
import { useCourseCurriculumFeatureFlags } from "../../context/courseCurriculumFlagContext";
import AddTopicsModal from "./createCurriculum/AddTopicsModal";
import AddSubTopicsModal from "./createCurriculum/AddSubTopicsModel";
import { useTopicsList } from "../../context/topicsListContext";
import { useNavLinkState } from "../../context/navlinkContext";

const insertCurriculamApi = async (
  facultyId,
  sessionName,
  tableData,
  useMasterDB,
  moduleId
) => {
  await axios.post(
    `${process.env.REACT_APP_FACULTY_API}facultycurriculam/insertfacultycurriculam`,
    {
      facultyId: facultyId,
      courseCurriculam_Name: sessionName,
      mappingId: 0,
      status: "pending",
      curriculam_Id: null,
      useMasterDB,
      moduleId,
      facultyCourseMapping: tableData.map((combo) => ({
        topicName:
          typeof combo.topics === "object"
            ? combo.topics?.join(", ") || ""
            : combo.topics,
        subtopicName:
          typeof combo.subTopics === "object"
            ? combo.subTopics?.join(", ") || ""
            : combo.subTopics,
        sessionId: combo.sessionNumber,
      })),
    }
  );
};

const updateCurriculamApi = async (
  facultyId,
  sessionName,
  tableData,
  mappingId,
  curriculumId,
  useMasterDB,
  status,
  deletedRecords
) => {
  await axios.post(
    `${process.env.REACT_APP_FACULTY_API}facultycurriculam/updatefacultycurriculum`,
    {
      deletedRecords,
      facultyId: facultyId,
      courseCurriculam_Name: sessionName,
      mappingId: mappingId,
      status: status,
      curriculam_Id: curriculumId,
      useMasterDB,
      facultyCourseMapping: tableData.map((combo) => ({
        topicName:
          typeof combo.topics === "object"
            ? combo.topics?.join(", ") || ""
            : combo.topics,
        subtopicName:
          typeof combo.subTopics === "object"
            ? combo.subTopics?.join(", ") || ""
            : combo.subTopics,
        sessionId: combo.sessionNumber,
      })),
    }
  );
};

function CreateCourseCurriculumComponent({ userId }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [flags, setFlag] = useCourseCurriculumFeatureFlags();
  const { useMasterDB } = flags;
  const [isTableDirty, setIsTableDirty] = useState(false);
  const [showTopicModel, setShowTopicModel] = useState(false);
  const [showSubTopicModel, setShowSubTopicModel] = useState(false);
  const [showModules, setShowModules] = useState(true);
  const sessionNameRef = useRef(null);
  // stores all records deleted by the user
  const deletedItemsRef = useRef([]);

  const navHook = useNavLinkState();

  const edit = searchParams.get("e");
  const curriculum_Id = searchParams.get("e");

  const [sessionName, setSessionName] = useState("");
  const [curriculumData, setCurriculumData] = useState({
    mappingId: 0,
    curriculamId: null,
    status: "",
  });
  const [tableData, setTableData] = useState([
    {
      first: true,
      sessionNumber: 1,
      topics: [],
      subTopics: [],
    },
  ]);
  const [nameError, setNameError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [modules, setModues] = useState([]);
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [firstUseEffect, setFirstUseEffect] = useState(true);

  useEffect(() => {
    if (!firstUseEffect.current) {
      setFirstUseEffect(false);
      if (isTableDirty)
        navHook.addObserver(
          "navigationchangestart",
          (navigator) => {
            const res = window.confirm(
              "There are unsaved changes, sure you wanna leave?"
            );
            if (res) {
              navHook.removeObserver("navigationchangestart", 0);
              navHook.setNavLinksDisabled(false);

              navigator();
            }
          },
          0
        );

      return () => navHook.removeObserver("navigationchangestart", 0);
    }
  }, [firstUseEffect, isTableDirty]);

  useEffect(() => {
    if (!disableSubmit) {
      if (!navHook.navLinksDisabled) {
        navHook?.setNavLinksDisabled(true);
      }
    } else {
      if (navHook.navLinksDisabled) navHook?.setNavLinksDisabled(false);
    }
  }, [disableSubmit]);

  const { selectedModule, setSelectedModule } = useTopicsList();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModulesByFacultyId({ facultyId: userId });
        setModues(res?.data || []);

        if (res?.data && res.data.length > 0) {
          setSelectedModule(res.data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModules();
  }, []);

  useEffect(() => {
    if (tableData.length === 0) {
      setTableData([
        {
          sessionNumber: 1,
          topics: [],
          subTopics: [],
        },
      ]);
    }
  }, [tableData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (tableData && tableData[0]?.topics?.length) {
      setShowModules(false);
    } else {
      setShowModules(true);
    }
  }, [tableData]);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const res = await ac_curriculumByIDApi({
          curriculamId: curriculum_Id,
        });

        const transformedData = res.data.result.recordset.map((item) => ({
          ...item,
          sessionNumber: item.sessionId,
          topics: item.topicName?.split(", ") || [],
          subTopics: item.subtopicName?.split(", ") || [],

          topicName: undefined,
          subtopicName: undefined,
        }));

        const oneRow = res.data.result.recordset[0];

        if (edit)
          setCurriculumData((prev) => ({
            ...prev,
            mappingId: oneRow?.mapping_Id || 0,
            curriculamId: oneRow?.curriculamId || null,
            status: oneRow?.status || "",
          }));
        setSessionName(res.data.result.recordset[0]?.courseCurriculam_Name);
        setTableData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    if (curriculum_Id) fetchCurriculumData();
  }, [curriculum_Id]);

  const updateDeletedItems = (record) => {
    deletedItemsRef.current.push(record.mapping_Id);
  };

  const handleSubmit = async () => {
    if (!sessionName.trim()) {
      setNameError("Course Name is required");
      return;
    }

    if (curriculumData.status === "pending") {
      alert("Your cannot update till admin approved your curriculum.");
      return;
    }

    try {
      if (!edit)
        await insertCurriculamApi(
          userId,
          sessionName,
          tableData,
          useMasterDB,
          selectedModule
        );
      else
        await updateCurriculamApi(
          userId,
          sessionName,
          tableData,
          curriculumData.mappingId,
          curriculum_Id,
          useMasterDB,
          curriculumData.status,
          deletedItemsRef.current
        );

      if (!edit) navigate("/faculty/view-course-curriculum");
      else {
        navHook.removeObserver("navigationchangestart", 0);
        alert("curriculum updated sucessfully");
        navHook.setNavLinksDisabled(false);
      }
      setSubmitSuccess(true);
      setIsTableDirty(false);
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);

        sessionNameRef.current && sessionNameRef.current.focus();
      } else alert("Error submitting data");
    }
  };

  const submitForApproval = async () => {
    try {
      await updateCurriculamApi(
        userId,
        sessionName,
        tableData,
        curriculumData.mappingId,
        curriculum_Id,
        useMasterDB,
        "pending",
        deletedItemsRef.current
      );
      navigate("/faculty/view-course-curriculum");
      setIsTableDirty(false);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error submitting data");
    }
  };

  const handleSave = async () => {
    if (!sessionName.trim()) {
      setNameError("Course Name is required");
      return;
    }

    setIsTableDirty(false);
    try {
      await axios.post(
        `${process.env.REACT_APP_FACULTY_API}facultycurriculam/${
          edit ? "updatefacultycurriculum" : "insertfacultycurriculam"
        }`,
        {
          deletedRecords: deletedItemsRef.current,
          facultyId: userId,
          courseCurriculam_Name: sessionName,
          mappingId: edit ? curriculumData?.mappingId : 0,
          status: "draft",
          useMasterDB,
          moduleId: edit ? undefined : selectedModule,
          curriculam_Id: edit ? curriculum_Id : null,
          facultyCourseMapping: tableData.map((combo) => ({
            topicName:
              typeof combo.topics === "object"
                ? combo.topics?.join(", ") || ""
                : combo.topics,
            subtopicName:
              typeof combo.subTopics === "object"
                ? combo.subTopics?.join(", ") || ""
                : combo.subTopics,
            sessionId: combo.sessionNumber,
            moduleId: edit ? undefined : selectedModule,
          })),
        }
      );
      navigate("/faculty/view-course-curriculum");
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Create Course Curriculum
        </h1>
      </div>
      <hr className="mb-6 border-gray-300" />
      {showTopicModel && (
        <AddTopicsModal
          selectedModule={modules?.find(
            (_module) => _module.id === selectedModule
          )}
          showTopicModel={showTopicModel}
          setShowTopicModel={setShowTopicModel}
        />
      )}
      {showSubTopicModel && (
        <AddSubTopicsModal
          selectedModule={modules?.find(
            (_module) => _module.id === selectedModule
          )}
          showSubTopicModel={showSubTopicModel}
          setShowSubTopicModel={setShowSubTopicModel}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="w-[300px]">
            <TextField
              inputRef={sessionNameRef}
              label="Enter Curriculum Name"
              variant="outlined"
              fullWidth
              value={sessionName}
              onChange={(e) => {
                if (disableSubmit) setDisableSubmit(false);
                setSessionName(e.target.value);
                if (nameError) {
                  setNameError("");
                }
              }}
              error={!!nameError}
              helperText={nameError}
              className="bg-white rounded-md"
            />
          </div>

          <div className="flex gap-x-2">
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component="span"
                size="large"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
                onClick={() => setShowTopicModel(true)}
              >
                Add Topic
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component="span"
                size="large"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
                onClick={() => setShowSubTopicModel(true)}
              >
                Add SubTopic
              </Button>
            </Stack>
          </div>
        </div>

        <ul className="flex space-x-4">
          {modules.map((_module) => (
            <li className="space-x-2" key={_module.id || Math.random()}>
              <input
                type="radio"
                name="module"
                disabled={!showModules || edit}
                checked={selectedModule}
                id={_module.id}
              />
              <label htmlFor={_module.id}>{_module.moduleName}</label>
            </li>
          ))}
        </ul>

        <div className="w-full overflow-auto">
          <TableofApproval
            updateDeletedItems={updateDeletedItems}
            disableEdit={disableEdit}
            tableData={tableData}
            setTableData={setTableData}
            edit={curriculum_Id}
            setIsTableDirty={setIsTableDirty}
            isTableDirty={isTableDirty}
            selectedModule={selectedModule}
            setDisableSubmit={setDisableSubmit}
            disableSubmit={disableSubmit}
          />
        </div>

        <div className={clsx("flex", "justify-end gap-x-4")}>
          {curriculumData.status === "draft" && (
            <Button
              disabled={disableSubmit}
              variant="contained"
              color="primary"
              onClick={submitForApproval}
              className={
                "w-[240px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              }
            >
              Submit for Approval
            </Button>
          )}

          {!edit && (
            <Button
              disabled={disableSubmit}
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="w-[200px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Save As Draft
            </Button>
          )}

          {curriculumData.status === "rejected" && (
            <>
              <Button
                disabled={disableSubmit}
                variant="contained"
                color="primary"
                onClick={handleSave}
                className="w-[200px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Save As Draft
              </Button>
              <Button
                disabled={disableSubmit}
                variant="contained"
                color="primary"
                onClick={submitForApproval}
                className={
                  "w-[240px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                }
              >
                Submit for Approval
              </Button>
            </>
          )}

          <Button
            disabled={disableSubmit}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={
              "w-[260px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            }
          >
            {edit ? "Save Changes" : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({ userId: state.user.userId });

const mapDispatch = {};

const CreateCourseCurriculum = connect(
  mapState,
  mapDispatch
)(CreateCourseCurriculumComponent);

export default CreateCourseCurriculum;
