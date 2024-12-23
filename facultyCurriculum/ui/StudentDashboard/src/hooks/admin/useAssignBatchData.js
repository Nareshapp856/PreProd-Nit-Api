import { useEffect, useState } from "react";
import {
  fetchBatchListAPI,
  fetchFacultyListAPI,
  fetchTechnologyListAPI,
} from "../../services/api";

export const useAssignBatchData = ({ technologyId, resetFormData }) => {
  const [batchList, setBatchList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);

  useEffect(() => {
    if (resetFormData) resetFormData("reset");
  }, [technologyId]);

  useEffect(() => {
    try {
      const callFetchBatchesAPI = async () => {
        const res = await fetchBatchListAPI({
          technologyId: technologyId === "0" ? undefined : technologyId,
        });

        setBatchList(res.data || []);
      };

      callFetchBatchesAPI();
    } catch (error) {
      console.error(error);
      setBatchList([]);
    }
  }, [technologyId]);

  useEffect(() => {
    try {
      const callFacultiesAPI = async () => {
        const res = await fetchFacultyListAPI({
          technologyId: technologyId === "0" ? undefined : technologyId,
        });

        setFacultyList(res.data || []);
      };

      callFacultiesAPI();
    } catch (error) {
      console.error(error);
      setFacultyList([]);
    }
  }, [technologyId]);

  useEffect(() => {
    try {
      const callTechnologiesAPI = async () => {
        const res = await fetchTechnologyListAPI();

        setTechnologyList(res.data || []);
      };

      callTechnologiesAPI();
    } catch (error) {
      console.error(error);
      setTechnologyList([]);
    }
  }, []);

  return [batchList, technologyList, facultyList];
};
