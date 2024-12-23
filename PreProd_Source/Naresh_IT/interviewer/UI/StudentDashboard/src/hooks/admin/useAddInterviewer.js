import { useEffect, useState } from "react";
import {
  fetchTechnologiesAPI,
  fetchBatchesAPI,
  fetchInterviewersAPI,
} from "../../services/api";

const mockTechnologyData = [
  { id: 1, name: "tech 1" },
  { id: 2, name: "tech 2" },
  { id: 3, name: "tech 3" },
];

const mockBatchData = [
  { id: 1, name: "batch 1" },
  { id: 2, name: "batch 2" },
  { id: 3, name: "batch 3" },
];

const mockInterviewerData = [{ id: 75, name: "interviewer 1" }];

const technologyAdaptor = (techList) => {
  return techList.map((tech) => ({
    id: tech.TechnologyID,
    name: tech.TechnologyName,
  }));
};

const fetchTechnologies = async (setter) => {
  try {
    const res = await fetchTechnologiesAPI();
    setter(technologyAdaptor(res?.data || []));
  } catch (error) {
    setter([]);
  }
};

const fetchBatches = async (payload, setter) => {
  try {
    const res = await fetchBatchesAPI(payload);
    setter(res?.data || []);
  } catch (error) {
    setter([]);
  }
};

const fetchInterviewers = async (payload, setter) => {
  try {
    const res = await fetchInterviewersAPI(payload);

    setter(res?.data || []);
  } catch (error) {
    setter([]);
  }
};

export const useAddInterviewer = (props = {}) => {
  const [batchList, setBatchList] = useState(mockBatchData);
  const [technologyList, setTechnologyList] = useState(mockTechnologyData);
  const [interviewerList, setInterviewerList] = useState(mockInterviewerData);

  useEffect(() => {
    fetchBatches(props.techId, setBatchList);
    fetchInterviewers(props.techId, setInterviewerList);
  }, [
    props.techId,
    fetchBatches,
    fetchInterviewers,
    setBatchList,
    setInterviewerList,
  ]);

  useEffect(() => {
    fetchTechnologies(setTechnologyList);
    fetchBatches(undefined, setBatchList);
    fetchInterviewers(undefined, setInterviewerList);
  }, []);

  return [batchList, technologyList, interviewerList];
};
