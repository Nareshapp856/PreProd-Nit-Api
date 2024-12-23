import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteInterviewerBatchesComboAPI } from "../../../services/api";

const columnHelper = createColumnHelper();

function InterviewerTable({
  batchList,
  fetchInterviewerData,
  setInterviewerList,
  interviewerList,
  editInterviewer,
}) {
  const [selectedBatches, setSelectedBatches] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchInterviewerData(setInterviewerList);
  }, []);

  const handleBatchChange = (interviewerId, newSelectedBatches) => {
    setSelectedBatches((prevSelectedBatches) => ({
      ...prevSelectedBatches,
      [interviewerId]: newSelectedBatches,
    }));
  };

  const handleDelete = async (row) => {
    try {
      const res = await deleteInterviewerBatchesComboAPI(row?.interviewerId);
      if (res.status === 200) {
        setSnackbar({
          open: true,
          message: "Interviewer deleted successfully",
          severity: "success",
        });
        fetchInterviewerData(setInterviewerList);
      } else {
        alert("deleted successfully but failed to notify");
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to delete interviewer",
        severity: "error",
      });
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("interviewerId", {
        header: "ID",
        cell(info) {
          return (
            <button
              className="underline text-blue-800 underline-offset-4"
              onClick={() =>
                editInterviewer(
                  info.row.original?.interviewerId,
                  info.row.original?.batchIdList?.map((batch) => Number(batch))
                )
              }
            >
              {info.getValue()}
            </button>
          );
        },
      }),
      columnHelper.accessor("name", {
        header: "Interviewer Name",
      }),
      columnHelper.accessor("Batch List", {
        header: "Batch ID List",
        width: 300,
        cell: (info) => {
          const options = info.row.original.batchNameList || [];

          return (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="interviewer-batches-label">Name</InputLabel>
              <Select
                labelId="interviewer-batches-label"
                id="interviewer-batches"
                multiple
                value={options}
                input={<OutlinedInput label="Name" />}
              >
                {options.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        },
      }),
      columnHelper.display({
        header: "Actions",
        cell: (info) => (
          <IconButton
            color="error"
            onClick={() => handleDelete(info.row.original)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      }),
    ],
    [batchList]
  );

  const table = useReactTable({
    columns,
    data: interviewerList,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  style={{ width: header.column.columnDef.width }}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1E40AF",
                    color: "#ffffff",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    outline: ".2px solid rgba(30, 64, 175, 0.2)",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Snackbar for success/error alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default memo(InterviewerTable);
