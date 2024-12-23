import React, { useState } from "react";
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
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRecord from "./tableofapproval/AddRecord";

const columnHelper = createColumnHelper();

const columns = (handleEdit, handleDelete) => [
  columnHelper.accessor("sessionNumber", {
    header: "Session No.",
    cell: (info) => info.getValue(),
    width: 120,
  }),
  columnHelper.accessor("topics", {
    header: "Topic",
    cell: (info) => info.getValue(),
    width: 250,
  }),
  columnHelper.accessor("subTopics", {
    header: "Sub Topic",
    cell: (info) => info.getValue(),
    width: 250,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <Stack direction="row" spacing={1}>
        <IconButton
          color="primary"
          onClick={() => handleEdit(info.row.original)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleDelete(info.row.original)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
    width: 100,
  }),
];

export default function TableofApproval({ tableData, setTableData }) {
  const [newRecord, setNewRecord] = useState({
    sessionNumber: "",
    topics: "",
    subTopics: "",
  });
  const [editRecord, setEditRecord] = useState(null);

  const handleEdit = (record) => {
    setEditRecord(record);
    setNewRecord(record);
  };

  const handleDelete = (record) => {
    setTableData(
      tableData.filter((item) => item.sessionNumber !== record.sessionNumber)
    );
  };

  const table = useReactTable({
    columns: columns(handleEdit, handleDelete),
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddRecord = () => {
    if (editRecord) {
      // Update existing record
      setTableData(
        tableData.map((record) =>
          record.sessionNumber === editRecord.sessionNumber ? newRecord : record
        )
      );
      setEditRecord(null);
    } else {
      // Add new record
      setTableData([
        ...tableData,
        {
          sessionNumber: newRecord.sessionNumber,
          topics: newRecord.topics,
          subTopics: newRecord.subTopics,
        },
      ]);
    }

    // Clear input fields
    setNewRecord({
      sessionNumber: "",
      topics: "",
      subTopics: "",
    });
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ mt: 3, maxHeight: 400, overflowX: "auto", overflowY: "auto" }}
      >
        {tableData.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
          >
            Please upload data
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{ width: header.column.columnDef.width }}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "rgba(30, 64, 175, 0.8)", // Tailwind bg-blue-800 with low opacity
                        color: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.12)", // Border for header cells
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" }, // Light grey for row hover
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)", // Border for row cells
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.columnDef.width }}
                      sx={{
                        padding: "16px", // Consistent padding
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)", // Border for cell cells
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Stack spacing={2} sx={{ mb: 2, p: 3 }}>
        <Typography variant="h6">
          {editRecord ? "Edit Record" : "Add New Record"}
        </Typography>

        <AddRecord
          newRecord={newRecord}
          setNewRecord={setNewRecord}
          editRecord={editRecord}
          handleAddRecord={handleAddRecord}
        />
      </Stack>
    </div>
  );
}
