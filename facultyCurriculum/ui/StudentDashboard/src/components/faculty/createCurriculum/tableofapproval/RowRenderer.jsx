import {
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Select,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { memo, useEffect, useState } from "react";

function RowRenderer({ curriculum, index, topicsList, subTopicsList }) {
  const [topic, setTopic] = useState(curriculum.topics);
  const [subTopics, setSubTopics] = useState(curriculum.subTopics);
  const [edit, setEdit] = useState(false);

  const onTopicChange = (e) => {
    setTopic(() => [e.target.value]);
  };

  const cancelHandler = () => {
    setTopic(curriculum.topics);
    setSubTopics(curriculum.subTopics);
    setEdit(false);
  };
  console.log(topic[0], topicsList);
  return (
    <TableRow key={curriculum.sessionNumber}>
      <TableCell>{curriculum.sessionNumber}</TableCell>
      <TableCell>
        <select value={topic?.[0]} onChange={(e) => setTopic([e.target.value])}>
          <option value={0}>Select a Topic</option>
          {topicsList.map((topic) => (
            <option key={topic.TopicID} value={topic.TopicID}>
              {topic.TopicName}
            </option>
          ))}
        </select>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        {edit ? (
          <div className="flex">
            <Button onClick={() => setTopic([2])}>Update</Button>
            <Button onClick={cancelHandler}>Cancel</Button>
          </div>
        ) : (
          <Stack direction="row">
            <IconButton color="primary">
              <EditIcon onClick={() => setEdit(true)} />
            </IconButton>

            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton color="success">
              <AddCircleIcon />
            </IconButton>
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
}

export default memo(RowRenderer);
