import axios from "axios";
import { mockMcqQuestions } from "../constants/mcqQuestions";
import { FilterApiResponseServiceDataVersion } from "./api/filterApiService";

const baseURL = process.env.REACT_APP_API_URL;
const facultyURL = process.env.REACT_APP_FACULTY_API_URL;
const reportURL = process.env.REACT_APP_REPORT_API_URL;
const authURL = process.env.REACT_APP_AUTH_URL;

export const api = axios.create({ baseURL });
export const authAPI = axios.create({ baseURL: authURL });
export const facultyAPI = axios.create({ baseURL: facultyURL });
export const reportAPI = axios.create({ baseURL: reportURL });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 503) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function getDailyTasksApi(payload) {
  try {
    const res = await api.post("RetriveTestsBystudentId", payload);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getMcqandProgramsApi(payload) {
  try {
    function formatDateToLocal(date) {
      const year = date?.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // const mcqRes = await api.post("RetriveTestsBystudentId_Mcq", {
    //   studentId: payload.studentId,
    //   createdAt: formatDateToLocal(payload.createdAt),
    // });

    const codeRes = await api.post("GetTodayTests_code", {
      studentId: payload.studentId,
      createdAt: formatDateToLocal(payload.createdAt),
    });

    // const resObj = getMcqandProgramsService(mcqRes, codeRes);

    return codeRes;
  } catch (error) {
    throw error;
  }
}

export async function loginApi(payload) {
  try {
    const res = await authAPI.post("AuthenticateStudent", payload);

    if (res && res.data && res.data.IsAuthenticated) {
      let user =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"));

      if (!user) user = {};

      user.IsAuthenticated = true;

      user = JSON.stringify(user);

      localStorage.setItem("user", user);
    }

    return res;
  } catch (error) {
    throw error;
  }
}

// Faculty

export const at_fetchStudents = async (payload) => {
  try {
    const response = await facultyAPI.get(
      `/api/attendancetracker/getstudents/1`,
      payload
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const at_fetchSlots = async (payload) => {
  try {
    const response = await facultyAPI.get(
      `api/attendancetracker/getslots/1`,
      payload
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const at_submitUserActions = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/attendancetracker/submit-useractions`,
      payload
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const at_retrieveDetailsActions = async (payload) => {
  try {
    const response = await facultyAPI.get(
      `api/attendancetracker/load-data/${payload}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const d_graphApi = async (payload) => {
  try {
    const response = await api.get(`get_StudentReport/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_graphApi = async (payload) => {
  try {
    const response = await api.get(
      `get_StudentReport/${payload.userName}${
        payload.moduleName
          ? `?ModuleName=${payload.moduleName.replaceAll("#", "-")}`
          : ""
      }${
        payload.topicName
          ? `${
              payload.moduleName ? "&" : "?"
            }TopicName=${payload.topicName.replaceAll("#", "-")}`
          : ""
      }`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_graphTopicApi = async (payload) => {
  try {
    const response = await api.get(
      `get_StudentReport_Topic?username=${payload.userName}${
        payload.moduleName
          ? `&ModuleName=${payload.moduleName.replaceAll("#", "-")}`
          : ""
      }`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_graphModuleApi = async (payload) => {
  try {
    const response = await api.get(
      `get_StudentReport_module?username=${payload.userName}${
        payload.technologyName
          ? `&TechnologyName=${payload.technologyName.replaceAll("#", "-")}`
          : ""
      }`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_graphTechnologyApi = async (payload) => {
  try {
    const response = await api.get(
      `studentReport_Technology?username=${payload}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_technologyApi = async (payload) => {
  try {
    const response = await api.get(`get_StudentReport/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_moduleApi = async (payload) => {
  try {
    const response = await api.get(`get_StudentReport/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_topicApi = async (payload) => {
  try {
    const response = await api.get(`get_StudentReport/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const myP_subTopicApi = async (payload) => {
  try {
    const response = await api.get(`get_StudentReport/${payload}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const reportApi = async (payload) => {
  try {
    const response = await reportAPI.post(`/report/dashboard`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const mcqQuestionsApi = async (payload) => {
  try {
    const response = {
      data: mockMcqQuestions,
      status: 200,
    };

    return response;
  } catch (error) {
    throw error;
  }
};

export const sendOtpApi = async (payload) => {
  try {
    const response = await api.post(`/AuthincateUser&SendOtp_V1`, {
      userMail: payload.email,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const VerifyOtpApi = async (payload) => {
  try {
    const response = await authAPI.post(`/User_OtpVerification`, {
      userMail: payload.email,
      otp: payload.otp,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const changeUserPasswordApi = async (payload) => {
  try {
    const response = await authAPI.put(`/Usp_Update_UserPassword`, {
      userMain: payload.email,
      updatedPassword: payload.password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (payload) => {
  try {
    const response = await authAPI.put(`/Update_UserPassword`, {
      userMain: payload.email,
      updatedPassword: payload.password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const resetInitialPasswordApi = async (payload) => {
  try {
    const response = await authAPI.put(`/Update_UserPassword`, {
      oldPassword: payload.oldPassword,
      userMail: payload.userMail,
      updatedPassword: payload.password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fc_facultyCurriculumListApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getbasicdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const ac_curriculumListApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getfacultycurriculumdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const ac_curriculumByIDApi = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getcurriculamdetails`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// Updated api
export const ac_updateFaculityCurriculum = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/admin_updateCourseStatus`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const mb_fetch_courseCurriculum = async (payload) => {
  try {
    const response = await facultyAPI.post(
      "api/facultycurriculam/gettCurriculumNameByfacultyid",
      { facultyId: payload }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const mb_fetch_batches = async () => {
  try {
    const response = await facultyAPI.post(
      "api/facultycurriculam/getCourseBatchDetails"
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const mb_assign_batch = async (payload) => {
  try {
    const res = await facultyAPI.post(
      "/api/mybatches/insertbatchdetails",
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
};

export const ac_fetchCurriculamDetails = async (curriculumId) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getcoursedetailsbycurriculumid`,
      { curriculumId }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const ac_updateStatusBycurriculumId = async ({
  status,
  curriculumId,
}) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/updatestatusbycurriculum`,
      { status, curriculumId }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const fc_fetchTopics = async (payload) => {
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/gettopicidbymodule`,
      payload
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export const fc_fetchSubTopics = async ({ topicId }) => {
  // eventhough i'm sending TopicID it contains SubTopicName For some last minute work done
  try {
    const response = await facultyAPI.post(
      `api/facultycurriculam/getSubTopicIdIdByTopics`,
      { TopicID: topicId }
    );

    return FilterApiResponseServiceDataVersion(response);
  } catch (error) {
    throw error;
  }
};

export async function getModulesByFacultyId({ facultyId }) {
  try {
    const res = await facultyAPI.get(
      `api/facultycurriculam/getmodulesbyfacultyid/${facultyId}`
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function addTopicAPI({ moduleId, topicName }) {
  try {
    const res = await facultyAPI.post(`api/facultycurriculam/addtopic`, {
      moduleId,
      topicName,
    });

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function addSubTopicAPI({ moduleId, topicId, subTopicName }) {
  try {
    const res = await facultyAPI.post(`/api/facultycurriculam/addSubTopic`, {
      moduleId,
      topicId,
      subTopicName,
    });

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchBatchListAPI(payload) {
  let url = `/api/facultycurriculam/batchlist`;
  if (payload && payload.technologyId)
    url += `?technologyId=${payload.technologyId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchFacultyListAPI(payload) {
  let url = `/api/facultycurriculam/facultylist`;
  if (payload && payload.technologyId)
    url += `?technologyId=${payload.technologyId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchTechnologyListAPI(payload) {
  let url = `/api/facultycurriculam/technologylist`;
  if (payload && payload.technologyId)
    url += `?technologyId=${payload.technologyId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function submitAssignBatches(payload) {
  try {
    const res = await facultyAPI.post(
      `/api/facultycurriculam/submitfacultybatchassignment`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchAssignedBatchesAPI(payload) {
  let url = `api/facultycurriculam/fetchassignedbatches`;

  if (payload && payload.userId) {
    url += `?uid=${payload.userId}`;
  }
  try {
    const res = await facultyAPI.get(url, payload);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

// takes id of assingend Batch to get it's details
export async function fetchAssignedBatchDetailsAPI(payload) {
  try {
    const res = await facultyAPI.get(
      `api/facultycurriculam/assignedBatchDetails/${payload}`
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function updateAssignedBatchStatusAPI(payload) {
  try {
    const res = await facultyAPI.put(
      `api/facultycurriculam/updateassignedbatchstatus`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchApprovedBatchListAPI(payload) {
  let url = `/api/facultycurriculam/approvedbatchlist`;
  if (payload && payload.userId) url += `?uid=${payload.userId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchApprovedCurriculumListAPI(payload) {
  let url = `/api/facultycurriculam/fetchapprovedcurriculumlist`;
  if (payload && payload.userId) url += `?uid=${payload.userId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function assignCurriculumToFaculty(payload) {
  try {
    const res = await facultyAPI.post(
      `/api/facultycurriculam/assigncurriculumtofaculty`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function updateAssignCurriculumToFacultyAPI(payload) {
  try {
    const res = await facultyAPI.put(
      `/api/facultycurriculam/updateassignedcurriculum`,
      payload
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchAssignedCurriculumListAPI(payload) {
  let url = `/api/facultycurriculam/assignedcurriculumList`;
  if (payload && payload.userId) url += `?uid=${payload.userId}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function fetchAssignedCurriculumAPI(payload) {
  let url = `/api/facultycurriculam/assignedCurriculum`;
  if (payload) url += `?id=${payload}`;
  try {
    const res = await facultyAPI.get(url);

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function deleteAssignedCurriculumAPI(payload) {
  try {
    if (!payload) throw new Error("Must pass record details");

    const res = await facultyAPI.delete(
      `api/facultycurriculam/assignedCurriculum/${payload}`
    );

    return { status: res.status, data: res.data };
  } catch (error) {
    throw error;
  }
}

export async function fetchAdminAssignedBatchesAPI() {
  try {
    const res = await facultyAPI.get(
      `api/facultycurriculam/fetchAdminAssignedBatches`
    );

    return FilterApiResponseServiceDataVersion(res);
  } catch (error) {
    throw error;
  }
}

export async function deleteAssignedBatchByBatchAssignmentAPI(payload) {
  try {
    if (!payload.recordToDelete) throw new Error("Must pass record details");

    const res = await facultyAPI.delete(
      `api/facultycurriculam/assigned-batch-approval/${payload.recordToDelete}?uid=${payload.userId}`
    );

    return { status: res.status, data: res.data };
  } catch (error) {
    throw error;
  }
}
