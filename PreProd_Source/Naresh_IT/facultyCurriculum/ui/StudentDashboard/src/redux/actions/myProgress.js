import { types } from "./types";

export function myP_graphDispatch(payload) {
  return {
    type: types.MYP_GRAPH_DATA,
    payload,
  };
}

export function myP_graphTopicDispatch(payload) {
  return {
    type: types.MYP_TOPIC_GRAPH_DATA,
    payload,
  };
}

export function myP_graphModuleDispatch(payload) {
  return {
    type: types.MYP_MODULE_GRAPH_DATA,
    payload,
  };
}

export function myP_graphTechnologyDispatch(payload) {
  return {
    type: types.MYP_TECHNOLOGY_GRAPH_DATA,
    payload,
  };
}

export function myP_technologyDispatch(payload) {
  return {
    type: types.MYP_TECHNOLOGY_LIST,
    payload,
  };
}

export function myP_moduleDispatch(payload) {
  return {
    type: types.MYP_MODULE_LIST,
    payload,
  };
}

export function myP_topicDispatch(payload) {
  return {
    type: types.MYP_TOPIC_LIST,
    payload,
  };
}

export function myP_subtopicDispatch(payload) {
  return {
    type: types.MYP_SUBTOPIC_LIST,
    payload,
  };
}
