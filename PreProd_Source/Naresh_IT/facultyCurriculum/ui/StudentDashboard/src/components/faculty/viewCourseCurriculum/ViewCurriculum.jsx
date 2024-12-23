import clsx from "clsx";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import { fc_facultyCurriculumListDispatch } from "../../../redux/actions/faculty";
import { ac_curriculumByIDApi } from "../../../services/api";
import ViewCurriculumDetails from "./ViewCurriculumDetails";
import { IconButton } from "@mui/material";

function ViewCurriculumComponent({
  curriculumList = [],
  fetchCurriculum,
  filter,
  userId,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [filteredCurriculumList, setFilteredCurriculumList] =
    useState(curriculumList);

  // replacement for redux
  // used to store curriculam data
  const [curriculamData, setCurriculamData] = useState({});
  // flag indicates weather curriculam data is loading or not
  const [isLoading, setIsLoading] = useState(false);
  // flag to know weather do show data or not in view details feature
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) fetchCurriculum({ facultyId: userId });
  }, [fetchCurriculum, showModal]);

  useEffect(() => {
    setFilteredCurriculumList(
      filter !== "all"
        ? curriculumList.filter((curriculum) => curriculum.status === filter)
        : curriculumList
    );
  }, [filter, curriculumList]);

  // I Know This way of fetch dosen't make sense but what can i do.
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        setIsLoading(true);
        const res = await ac_curriculumByIDApi({
          curriculamId: showDetails?.id,
        });

        setCurriculamData(res?.data?.result?.recordset);
        setShowModal(true);
        setIsLoading(false);
      } catch (err) {}
    };

    if (showDetails) fetchCurriculumData();
  }, [showDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleDelete = (curriculum) => {
    console.log(curriculum);
  };

  return (
    <>
      {showModal && (
        <ViewCurriculumDetails
          curriculamData={curriculamData}
          setShowModal={setShowModal}
          curriculamName={showDetails?.name}
          curriculumId={showDetails?.id}
          status={showDetails?.status}
          mappingId={showDetails?.mapping_Id}
          comments={curriculamData?.[0]?.comments || ""}
        />
      )}

      {filteredCurriculumList.map((curriculum) => (
        <div
          key={curriculum.curriculam_Id}
          className={clsx(
            "w-[320px] shadow-lg bg-white p-1 border-s-4 py-2 rounded-md border-[.6px]",
            curriculum.status?.toLowerCase() === "pending"
              ? "border-yellow-400"
              : curriculum.status?.toLowerCase() === "approved"
              ? "border-green-400"
              : curriculum.status?.toLowerCase() === "revert"
              ? "border-pink-400"
              : "border-red-400"
          )}
        >
          <div className="p-1">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {curriculum.courseCurriculam_Name}
                </p>
                <span className="text-[.8rem] font-[100] opacity-80">
                  created at:{" "}
                  {new Date(curriculum.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p
              className={clsx(
                "text-md bg-opacity-50 w-[5rem] text-center rounded-xl my-1",
                curriculum.status?.toLowerCase() === "pending"
                  ? "bg-yellow-400 text-yellow-900"
                  : curriculum.status?.toLowerCase() === "approved"
                  ? "bg-green-400 text-green-900"
                  : curriculum.status?.toLowerCase() === "revert"
                  ? "bg-pink-400"
                  : "bg-red-400"
              )}
            >
              {curriculum.status?.toLowerCase() || "placeholder"}
            </p>
          </div>
          <hr />
          <div className="p-1 pt-2">
            <button
              onClick={() => {
                setShowDetails({
                  id: curriculum.curriculam_Id,
                  name: curriculum.courseCurriculam_Name,
                  status: curriculum.status,
                });
              }}
              className="text-[.8rem] text-blue-500 flex items-center"
            >
              View Details <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
  curriculumList: state.fc_facultyCurriculumList.data?.data || [],
});

const mapDispatch = {
  fetchCurriculum: fc_facultyCurriculumListDispatch,
};

const ViewCurriculum = connect(mapState, mapDispatch)(ViewCurriculumComponent);

export default ViewCurriculum;
