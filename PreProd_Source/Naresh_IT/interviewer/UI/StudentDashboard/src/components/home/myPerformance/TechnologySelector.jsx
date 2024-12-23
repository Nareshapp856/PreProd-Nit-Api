import React, { useEffect } from "react";
import {
  myP_graphModuleDispatch,
  myP_graphTechnologyDispatch,
  myP_graphTopicDispatch,
  myP_moduleDispatch,
  myP_subtopicDispatch,
  myP_technologyDispatch,
  myP_topicDispatch,
} from "../../../redux/actions/myProgress";
import { connect } from "react-redux";

function TechnologySelectorComponent({
  technologyData,
  userName,
  moduleData,
  topicData,
  subTopicData,
  graphTopic,
  graphModule,
  graphTechnology,
  fetchTechnology,
  fetchModule,
  fetchTopic,
  fetchSubtopic,
}) {
  useEffect(() => {
    graphTopic(userName);
    graphModule(userName);
    graphTechnology(userName);
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-600">
            Technology
            <select className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="DotNet">DotNet</option>
              <option value="Java">Java</option>
            </select>
          </label>
        </div>

        <div className="w-1/2 pl-2">
          <label className="block mb-1 text-gray-600">
            Module
            <select className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="DotNet">DotNet</option>
              <option value="Java">Java</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex justify-between mb-5">
        <div className="w-1/2 pr-2">
          <label className="block mb-1 text-gray-600">
            Topic
            <select className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
            </select>
          </label>
        </div>

        <div className="w-1/2 pl-2">
          <label className="block mb-1 text-gray-600">
            Subtopic
            <select className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => ({
  technologyData: state.myP_technology.data,
  moduleData: state.myP_module.data,
  topicData: state.myP_topic.data,
  subTopicData: state.myP_subTopic.data,
  userName: state.user.userName,
});

const mapDispatch = {
  fetchTechnology: myP_technologyDispatch,
  fetchModule: myP_moduleDispatch,
  fetchTopic: myP_topicDispatch,
  fetchSubtopic: myP_subtopicDispatch,
  graphTopic: myP_graphTopicDispatch,
  graphModule: myP_graphModuleDispatch,
  graphTechnology: myP_graphTechnologyDispatch,
};

const TechnologySelector = connect(
  mapState,
  mapDispatch
)(TechnologySelectorComponent);

export default TechnologySelector;
