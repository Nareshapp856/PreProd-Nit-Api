import { useEffect, useState } from "react";

export const useEvolutionSheet = ({ selectedTopics, TopicsList }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (selectedTopics.length > tableData.length)
      // selected new topic
      selectedTopics.forEach((topic) => {
        const topicObj = TopicsList.find((item) => item.id === topic);

        if (!topicObj) return;

        if (!tableData.some((topic) => topic.id === topicObj.id)) {
          setTableData((prev) => [
            ...prev,
            { ...topicObj, obtainedMarks: 0, maxMarks: 0 },
          ]);
        }
      });
    else if (selectedTopics.length === 0 && tableData.length !== 0) {
      setTableData([]);
    } else if (selectedTopics.length < tableData.length) {
      // Deleted a topic

      const tableDataArr = tableData.map((item) => item.id);

      const deletedRecords = tableDataArr.filter(
        (row) => !selectedTopics.includes(row)
      );

      setTableData((prev) =>
        prev.filter((record) => !deletedRecords.includes(record.id))
      );
    }
  }, [selectedTopics, tableData, setTableData]);

  return [tableData, setTableData];
};
