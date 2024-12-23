import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

import BatchForm from "./mybatches/BatchForm";
import BatchTable from "./mybatches/BatchTable";
import {
  mb_fetch_batches,
  mb_fetch_courseCurriculum,
} from "../../services/api";

const fetchCourseCurriculum = async (setter, payload) => {
  try {
    const res = await mb_fetch_courseCurriculum(payload);
    setter(res.data || []);
  } catch (error) {
    console.log(error);
  }
};

const fetchBatches = async (setter, payload) => {
  try {
    const res = await mb_fetch_batches(payload);
    setter(res.data || []);
  } catch (error) {
    console.log(error);
  }
};

function MyBatchesComponent({ userId }) {
  const [view, setView] = useState("assign");
  const [courseCurriculumList, setCourseCurriculumList] = useState([]);
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
    fetchCourseCurriculum(setCourseCurriculumList, userId);
    fetchBatches(setBatchList, userId);
  }, []);

  const fetchData = (id) => {
    console.log(id);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Batches</h1>
      <hr className="mb-6 border-gray-300" />

      <div>
        <ul className="flex space-x-4 mb-6 border-b-2 border-gray-200">
          <li>
            <Button
              variant="text"
              className={`relative px-4 py-2 transition-all duration-300 ${
                view === "assign"
                  ? "text-blue-900 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => handleViewChange("assign")}
            >
              Assign New Curriculum
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              className={`relative px-4 py-2 transition-all duration-300 ${
                view === "show"
                  ? "text-blue-900 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => handleViewChange("show")}
            >
              Show Assigned Curriculums
            </Button>
          </li>
        </ul>

        <motion.div
          key={view}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
        >
          {view === "assign" ? (
            <BatchForm
              courseCurriculumList={courseCurriculumList}
              batchList={batchList}
              setView={setView}
            />
          ) : (
            <BatchTable
              handleViewChange={handleViewChange}
              fetchData={fetchData}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

const mapState = (state) => ({ userId: state.user.userId });

const mapDispatch = {};

export default connect(mapState, mapDispatch)(MyBatchesComponent);
