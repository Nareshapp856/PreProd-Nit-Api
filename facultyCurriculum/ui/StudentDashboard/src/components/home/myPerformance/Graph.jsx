import {
  myP_graphDispatch,
  myP_graphModuleDispatch,
  myP_graphTechnologyDispatch,
  myP_graphTopicDispatch,
} from "../../../redux/actions/myProgress";
import React, { useEffect, useState } from "react";
import TopicGraph from "./graph/TopicGraph";
import ModuleGraph from "./graph/ModuleGraph";
import SubTopicGraph from "./graph/SubTopicGraph";
import TechnologyGraph from "./graph/TechnologyGraph";
import { connect } from "react-redux";
import RotateLeftIcon from "@mui/icons-material/RestartAlt";
import { GetFirstColorsServiceForBars } from "../../../services/myPerformance/getFirstColorsServiceForBars";

const GetFirstColorsForBarsService = GetFirstColorsServiceForBars;

function GraphComponent({
  myP_moduleGraphState,
  myP_topicGraphState,
  myP_subTopicGraphState,
  myP_technologyGraphState,
  //
  myP_technologyGraphData,
  myP_moduleGraphData,
  myP_topicGraphData,
  myP_subTopicGraphData,
  //
  userName,
  graph,
  topicGraph,
  moduleGraph,
  technologyGraph,
}) {
  const [firstFetch, setFirstFetch] = useState({
    subTopicModuleSubFirst: true,
    subtopic: true,
    module: true,
    topic: true,
    technology: true,
  });
  const [moduleBarColor, setModuleBarColor] = useState("");
  const [topicBarColor, setTopicBarColor] = useState("");
  const [subTopicBarColor, setSubTopicBarColor] = useState("");

  useEffect(() => {
    setFirstFetch((prev) => ({ ...prev, technology: false }));
    technologyGraph(userName);
  }, []);

  useEffect(() => {
    if (myP_technologyGraphState === "response") {
      if (myP_technologyGraphData && Array.isArray(myP_technologyGraphData)) {
        GetFirstColorsForBarsService.subscribe("technology", (e) => {
          setModuleBarColor(e);
        });
        moduleGraph({
          userName,
          technologyName: myP_technologyGraphData[0]?.yaxies,
        });
      } else {
        moduleGraph({ userName });
      }

      setFirstFetch((prev) => ({ ...prev, module: false }));
    }
  }, [myP_technologyGraphState]);

  useEffect(() => {
    if (myP_moduleGraphState === "response") {
      if (myP_moduleGraphData && Array.isArray(myP_moduleGraphData)) {
        GetFirstColorsForBarsService.subscribe("module", (e) => {
          setTopicBarColor(e);
        });
        topicGraph({ userName, moduleName: myP_moduleGraphData[0]?.yaxies });
      } else {
        topicGraph({ userName });
      }

      setFirstFetch((prev) => ({ ...prev, topic: false }));
    }
  }, [myP_moduleGraphState]);

  useEffect(() => {
    if (myP_moduleGraphState === "response") {
      if (myP_moduleGraphData && Array.isArray(myP_moduleGraphData)) {
        GetFirstColorsServiceForBars.subscribe("module", (e) => {
          setSubTopicBarColor(e);
        });
        graph({
          userName,
          moduleName: myP_moduleGraphData[0]?.yaxies,
        });
      }
    }
  }, [myP_moduleGraphState === "response", myP_moduleGraphData]);

  const onClick = (type) => {
    switch (type) {
      case "Technology": {
        technologyGraph(userName);
        break;
      }
      case "Module": {
        setModuleBarColor("");
        moduleGraph({ userName });
        break;
      }
      case "Topic": {
        setTopicBarColor("");
        topicGraph({ userName });
        break;
      }
      case "SubTopic": {
        setSubTopicBarColor("");
        graph({ userName });
        break;
      }
      default:
        throw new Error("not a valid type");
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-[50%] p-4">
        <div className="flex justify-between">
          <h2 className="text-xl ms-4 mb-2 text-gray-700">Technology</h2>
          <span className="me-4 cursor-pointer">
            <RotateLeftIcon
              onClick={() => onClick("Technology")}
              sx={{ color: "rgba(55, 65, 81, .9)" }}
            />
          </span>
        </div>
        <TechnologyGraph setModuleBarColor={setModuleBarColor} />
      </div>
      <div className="w-[50%] p-4">
        <div className="flex justify-between">
          <h2 className="text-xl ms-4 mb-2 text-gray-700">Module</h2>
          <span className="me-4 cursor-pointer">
            <RotateLeftIcon
              onClick={() => onClick("Module")}
              sx={{ color: "rgba(55, 65, 81, .9)" }}
            />
          </span>
        </div>
        <ModuleGraph
          moduleBarColor={moduleBarColor}
          setTopicBarColor={setTopicBarColor}
          setSubTopicBarColor={setSubTopicBarColor}
        />
      </div>
      <div className="w-[50%] p-4">
        <div className="flex justify-between">
          <h2 className="text-xl ms-4 mb-2 text-gray-700">Topic</h2>
          <span className="me-4 cursor-pointer">
            <RotateLeftIcon
              onClick={() => onClick("Topic")}
              sx={{ color: "rgba(55, 65, 81, .9)" }}
            />
          </span>
        </div>
        <TopicGraph
          topicBarColor={topicBarColor}
          setSubTopicBarColor={setSubTopicBarColor}
        />
      </div>
      {/* <div className="w-[50%] p-4">
        <div className="flex justify-between">
          <h2 className="text-xl ms-4 mb-2 text-gray-700">SubTopic</h2>
          <span className="me-4 cursor-pointer">
            <RotateLeftIcon
              onClick={() => onClick("SubTopic")}
              sx={{ color: "rgba(55, 65, 81, .9)" }}
            />
          </span>
        </div>
        <SubTopicGraph subTopicBarColor={subTopicBarColor} />
      </div> */}
    </div>
  );
}

const mapState = (state) => ({
  userState: state.user,
  userName: state.user.userName,
  macqandprogramState: state.mcqsandprograms.state,

  //
  myP_technologyGraphState: state.myP_technologyGraph.state,
  myP_moduleGraphState: state.myP_moduleGraph.state,
  myP_topicGraphState: state.myP_topicGraph.state,
  myP_subTopicGraphState: state.myP_graph.state,

  //

  myP_technologyGraphData: state.myP_technologyGraph.data,
  myP_moduleGraphData: state.myP_moduleGraph.data,
  myP_topicGraphData: state.myP_topicGraph.data,
  myP_subTopicGraphData: state.myP_graph.data,
});

const mapDispatch = {
  graph: myP_graphDispatch,
  topicGraph: myP_graphTopicDispatch,
  moduleGraph: myP_graphModuleDispatch,
  technologyGraph: myP_graphTechnologyDispatch,
};

const Graph = connect(mapState, mapDispatch)(GraphComponent);

export default Graph;
