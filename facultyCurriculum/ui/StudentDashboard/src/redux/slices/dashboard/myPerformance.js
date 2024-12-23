import { getBasicGetSlice } from "../../util/get";

export const myP_graphSlice = getBasicGetSlice({
  sliceName: "myP_graph",
});

export const myP_topicGraphSlice = getBasicGetSlice({
  sliceName: "myP_topicGraph",
});

export const myP_moduleGraphSlice = getBasicGetSlice({
  sliceName: "myP_moduleGraph",
});

export const myP_technologyGraphSlice = getBasicGetSlice({
  sliceName: "myP_technologyGraph",
});

export const myP_technologySlice = getBasicGetSlice({
  sliceName: "myP_technology",
});

export const myP_moduleSlice = getBasicGetSlice({
  sliceName: "myP_module",
});

export const myP_topicSlice = getBasicGetSlice({
  sliceName: "myP_topic",
});

export const myP_subTopicSlice = getBasicGetSlice({
  sliceName: "myP_subTopic",
});

export const {
  fetchStart: myP_fetchGraphStart,
  fetchSuccess: myP_fetchGraphSuccess,
  fetchError: myP_fetchGraphError,
} = myP_graphSlice.actions;

export const {
  fetchStart: myP_fetchTopicGraphStart,
  fetchSuccess: myP_fetchTopicGraphSuccess,
  fetchError: myP_fetchTopicGraphError,
} = myP_topicGraphSlice.actions;

export const {
  fetchStart: myP_fetchModuleGraphStart,
  fetchSuccess: myP_fetchModleGraphSuccess,
  fetchError: myP_fetchModleGraphError,
} = myP_moduleGraphSlice.actions;

export const {
  fetchStart: myP_fetchTechnologyGraphStart,
  fetchSuccess: myP_fetchTechnologyGraphSuccess,
  fetchError: myP_fetchTechnologyGraphError,
} = myP_technologyGraphSlice.actions;

export const {
  fetchStart: myP_fetchTechnologyStart,
  fetchSuccess: myP_fetchTechnologySuccess,
  fetchError: myP_fetchTechnologyError,
} = myP_technologySlice.actions;

export const {
  fetchStart: myP_fetchSubTopicStart,
  fetchSuccess: myP_fetchSubTopicSuccess,
  fetchError: myP_fetchSubTopicError,
} = myP_subTopicSlice.actions;

export const {
  fetchStart: myP_fetchTopicStart,
  fetchSuccess: myP_fetchTopicSuccess,
  fetchError: myP_fetchTopicError,
} = myP_topicSlice.actions;

export const {
  fetchStart: myP_fetchModuleStart,
  fetchSuccess: myP_fetchModuleSuccess,
  fetchError: myP_fetchModuleError,
} = myP_moduleSlice.actions;
