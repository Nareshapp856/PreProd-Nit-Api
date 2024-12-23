import { Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { fetchAssignedBatchesAPI } from "../../../../services/api";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";

const MotionPaper = motion(Paper);

// setter will recieve list of approval data or []
const fetchAssignedBatches = async (payload, handler) => {
  try {
    const res = await fetchAssignedBatchesAPI(payload);

    handler(res.data || []);
  } catch (error) {
    console.error(error);
    handler([]);
  }
};

function ApprovalListComponent({
  selectHandler,
  userId,
  approvalList,
  setApprovalList,
}) {
  // stores list of approval data {id , status, approvalId}

  useEffect(() => {
    fetchAssignedBatches({ userId }, setApprovalList);
  }, []);

  useEffect(() => {
    if (
      Array.isArray(approvalList) &&
      approvalList[0] &&
      approvalList[0].approvalId
    )
      selectHandler(approvalList[0].approvalId);
    else {
      selectHandler(null);
    }
  }, [approvalList]);

  return (
    <MotionPaper
      elevation={3}
      sx={{
        width: "20rem",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h2"
        fontSize={20}
        sx={{
          paddingInline: 2,
          paddingBlock: 2,
          fontWeight: "bold",
          backgroundColor: "#1E40AF",
          color: "#ffffff",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        Assigned Batches
      </Typography>
      <Stack
        sx={{
          padding: 2,
          gap: 1,
          "& > *": {
            transition: "transform 0.3s, color 0.3s",
            borderRadius: "4px",
          },
          "& > *:hover": {
            transform: "scale(1.05)",
            color: "#1E40AF",
          },
        }}
      >
        {approvalList.length > 0 ? (
          approvalList.map((item, index) => (
            <button
              key={item.id}
              onClick={() => selectHandler(item.approvalId)}
              className="flex items-center justify-between"
            >
              <Typography
                variant="body2"
                fontSize={15}
                fontWeight={600}
                className="hover:cursor-pointer"
              >
                Assignment {index + 1}
              </Typography>
              <span className="w-[5rem]">- {item.status}</span>
            </button>
          ))
        ) : (
          <p className="font-semibold opacity-80">No Data To View</p>
        )}
      </Stack>
    </MotionPaper>
  );
}

const mapState = (state) => ({
  userId: state.user.userId,
});

const mapDispatch = {};

const ApprovalList = connect(mapState, mapDispatch)(ApprovalListComponent);

export default memo(ApprovalList);
