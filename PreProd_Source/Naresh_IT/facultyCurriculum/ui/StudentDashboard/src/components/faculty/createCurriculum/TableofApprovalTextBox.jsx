import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const columnHelper = createColumnHelper();

const TableofApprovalTextBox = ({
  tableData = [],
  setTableData,
  edit,
  setIsTableDirty,
  isTableDirty,
}) => {
  const [editableRow, setEditableRow] = useState(
    tableData && tableData[0]?.first ? 0 : null
  );

  const topicsList = useMemo(() => ["Topic 1", "Topic 2", "Topic 3"], []);
  const subTopicsList = useMemo(
    () => ["SubTopic 1", "SubTopic 2", "SubTopic 3"],
    []
  );

  const handleEdit = useCallback(
    (index) => {
      if (!isTableDirty) setIsTableDirty(true);
      setEditableRow(index);
      if (!isTableDirty) setIsTableDirty(true);
    },
    [isTableDirty]
  );

  const handleDelete = useCallback(
    (record) => {
      setTableData((prev) =>
        prev.filter((item) => item.sessionNumber !== record.sessionNumber)
      );
    },
    [setTableData]
  );
  const handleAddRecord = useCallback(
    (data) => {
      const newIndex = Number(data?.sessionNumber) || 0;
      const newRow = {
        sessionNumber: `${newIndex + 1}`,
        topics: [],
        subTopics: [],
        first: false,
      };

      setTableData((prev) => {
        const updatedData = [...prev];

        updatedData.splice(newIndex, 0, newRow);

        return updatedData.map((item, index) => ({
          ...item,
          sessionNumber: `${index + 1}`,
        }));
      });

      if (!isTableDirty) setIsTableDirty(true);

      setEditableRow(newIndex);
    },
    [tableData.length, setTableData, isTableDirty]
  );

  const handleInputChange = useCallback(
    (index, key, value) => {
      if (key === "topics" || key === "subTopics") {
        setTableData((prev) => {
          const updatedData = [...prev];
          console.log(tableData[index], index, key, value, updatedData[0]);
          updatedData[index][key] = [value];
          return updatedData;
        });
      } else {
        setTableData((prev) => {
          const updatedData = [...prev];
          updatedData[index][key] = value;
          return updatedData;
        });
      }
    },
    [setTableData]
  );

  const handleSave = useCallback(() => {
    if (!isTableDirty) setIsTableDirty(true);
    setEditableRow(null);
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("sessionNumber", {
        header: <p className="">{`Session - ${tableData?.length}`}</p>,
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <TextField
                defaultValue={info.row.original.sessionNumber}
                disabled
                onChange={(e) =>
                  handleInputChange(
                    info.row.index,
                    "sessionNumber",
                    e.target.value
                  )
                }
              />
            );
          }
          return info.getValue();
        },
        width: 100,
      }),
      columnHelper.accessor("topics", {
        header: "Topic",
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <TextField
                fullWidth
                value={info.getValue()}
                onChange={(e) =>
                  handleInputChange(info.row.index, "topics", e.target.value)
                }
              />
            );
          }
          return info.getValue();
        },
        width: 250,
      }),
      columnHelper.accessor("subTopics", {
        header: "Sub Topic",
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <TextField
                fullWidth
                value={info.row.original.subTopics}
                onChange={(e) =>
                  handleInputChange(info.row.index, "subTopics", e.target.value)
                }
              />
            );
          }
          return info.getValue().join(", ");
        },
        width: 250,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) =>
          info.row.index === editableRow ? (
            <Button onClick={() => handleSave(info.row.index)}>Update</Button>
          ) : (
            <Stack direction="row">
              <IconButton
                color="primary"
                onClick={() => handleEdit(info.row.index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(info.row.original)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="success"
                onClick={() => handleAddRecord(info.row.original)}
              >
                <AddCircleIcon />
              </IconButton>
            </Stack>
          ),
        width: 100,
      }),
    ],
    [
      editableRow,
      handleEdit,
      handleDelete,
      handleAddRecord,
      handleInputChange,
      handleSave,
      topicsList,
      subTopicsList,
    ]
  );

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          maxHeight: 500,
          minWidth: 900,
        }}
      >
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
                      backgroundColor: "rgba(30, 64, 175, 0.8)",
                      color: "#ffffff",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
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
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.columnDef.width }}
                    sx={{
                      padding: "16px",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default memo(TableofApprovalTextBox);
