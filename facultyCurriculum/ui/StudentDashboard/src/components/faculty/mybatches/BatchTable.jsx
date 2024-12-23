import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { facultyAPI } from "../../../services/api";
import { connect } from "react-redux";

const columnHelper = createColumnHelper();

const BatchTableComponent = ({ userId, handleViewChange, fetchData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await facultyAPI.get(
          `/api/myBatches/fetch-course-details/${userId}`
        );
        setTableData(data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    /**
 *  curriculumName: "Curriculum 1",
        batchName: "Batch 1",
        startDate: "2024-09-01",
        slot: "6:00 PM - 7:30 PM",
 */

    // StartDate
    // SlotDetails

    fetchCourseDetails();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("curriculumName", {
        header: "Curriculum Name",
        // Replace The original.id with id prop
        cell: (info) => (
          <button
            onClick={() => {
              searchParams.set("id", "replace");

              setSearchParams(searchParams);
              handleViewChange("assign");
              fetchData(info.row.original.id);
            }}
          >
            {info.getValue()}
          </button>
        ),
      }),
      columnHelper.accessor("batchName", {
        header: "Batch Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("slot", {
        header: "Slot",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const data = useMemo(() => [], []);

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
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
              ))
            )}
          </TableRow>
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
    </div>
  );
};

const mapState = (state) => ({
  userId: state.user.userId,
});

const BatchTable = connect(mapState, null)(BatchTableComponent);

export default BatchTable;
