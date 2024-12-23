import { useEffect, useState } from "react";
import {
  fetchTechnologiesAPI,
  fetchBatchesByInterviewerIdAPI,
  fetchStudentsByBatchIdAPI,
  fetchModulesByInterviewerIdAPI,
  fetchTopicAPI,
} from "../../services/api";
import { useSelector } from "react-redux";

const mockStudentData = [
  { id: 1, name: "student 1" },
  { id: 2, name: "student 2" },
  { id: 3, name: "student 3" },
];

const mockModuleData = [
  { id: 1, name: "module 1" },
  { id: 2, name: "module 2" },
  { id: 3, name: "module 3" },
];

const mockTopicData = [
  { id: 1, name: "topic 1" },
  { id: 2, name: "topic 2" },
  { id: 3, name: "topic 3" },
];

const mockBatchData = [
  { id: 1, name: "batch 1" },
  { id: 2, name: "batch 2" },
  { id: 3, name: "batch 3" },
];

const fetchTopics = async (payload, setter) => {
  const res = await fetchTopicAPI(payload);

  setter(res?.data || []);
};

const fetchStudents = async (payload, setter) => {
  const res = await fetchStudentsByBatchIdAPI(payload);

  setter(res?.data || []);
};

const fetchBatches = async (payload, setter) => {
  try {
    const res = await fetchBatchesByInterviewerIdAPI(payload);

    setter(res?.data || []);
  } catch (error) {
    setter([]);
  }
};

const fetchModules = async (payload, setter) => {
  try {
    const res = await fetchModulesByInterviewerIdAPI(payload);

    setter(res?.data || []);
  } catch (error) {
    setter([]);
  }
};

export const useMockInterviewer = (props = {}) => {
  const [batchList, setBatchList] = useState(mockBatchData);
  const [StudentList, setStudentList] = useState(mockStudentData);
  const [ModuleList, setModuleList] = useState(mockModuleData);
  // To Do, Make the operation of retriving the topics much more optmized by only fetching the selected module when they selected an item insted of fetching all when user selected new module
  const [topicList, setTopicList] = useState(mockTopicData);

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId) {
      fetchBatches(userId, setBatchList);
      fetchModules(userId, setModuleList);
    }
  }, [userId, setBatchList, fetchBatches]);

  return [
    batchList,
    StudentList,
    ModuleList,
    topicList,
    // to fetch student list
    (batchId) => {
      if (!batchId) return setStudentList([]);
      fetchStudents(batchId, setStudentList);
    },
    // to fetch topic list
    (moduleIds) => {
      if (!moduleIds) return setTopicList([]);

      fetchTopics(moduleIds, setTopicList);
    },
  ];
};
