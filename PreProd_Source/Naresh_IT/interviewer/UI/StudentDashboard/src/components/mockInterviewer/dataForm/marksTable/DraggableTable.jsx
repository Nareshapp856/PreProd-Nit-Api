import React, { memo, useCallback, useMemo } from "react";
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
  TableFooter,
  Paper,
  TextField,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const columnHelper = createColumnHelper();

const DraggableTable = ({ tableData, setTableData }) => {
  const handleInputChange = useCallback(
    (index, key, value) => {
      setTableData((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, [key]: value } : item
        )
      );
    },
    [setTableData]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Topic",
      }),
      columnHelper.accessor("obtainedMarks", {
        header: "Student Marks",
        cell: (info) => (
          <TextField
            type="number"
            value={info.getValue()}
            onChange={(e) =>
              handleInputChange(info.row.index, "obtainedMarks", e.target.value)
            }
            variant="outlined"
            size="small"
          />
        ),
      }),
      columnHelper.accessor("maxMarks", {
        header: "Max Marks",
        cell: (info) => (
          <TextField
            type="number"
            value={info.getValue()}
            onChange={(e) =>
              handleInputChange(info.row.index, "maxMarks", e.target.value)
            }
            variant="outlined"
            size="small"
          />
        ),
      }),
    ],
    [handleInputChange]
  );

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedData = Array.from(tableData);
    const [movedItem] = updatedData.splice(source.index, 1);
    updatedData.splice(destination.index, 0, movedItem);
    setTableData(updatedData);
  };

  // Calculate totals for footer
  const totalobtainedMarks = useMemo(
    () => tableData.reduce((acc, curr) => acc + Number(curr.obtainedMarks), 0),
    [tableData]
  );

  const totalMaxMarks = useMemo(
    () => tableData.reduce((acc, curr) => acc + Number(curr.maxMarks), 0),
    [tableData]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <TableContainer
            component={Paper}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "rgba(30, 64, 175, 0.8)",
                          color: "#ffffff",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
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
                {table.getRowModel().rows.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>
                    <p>{totalobtainedMarks}</p>
                  </TableCell>
                  <TableCell>{totalMaxMarks}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(DraggableTable);
