import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
  Line,
} from "recharts";
import {
  myP_graphDispatch,
  myP_graphTopicDispatch,
} from "../../../../redux/actions/myProgress";
import { GetFirstColorsServiceForBars } from "../../../../services/myPerformance/getFirstColorsServiceForBars";

const GetFirstColorsForBarsService = GetFirstColorsServiceForBars;

const ModuleGraphComponent = ({
  graphData,
  userName,
  topicGraph,
  subTopicGraph,
  moduleBarColor,
  setTopicBarColor,
  setSubTopicBarColor,
}) => {
  const [dataList, setDataList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState({});

  const getRandomColor = (key) => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    setColors((prevColors) => ({ ...prevColors, [key]: color }));
    return color;
  };

  useEffect(() => {
    if (Array.isArray(graphData)) {
      const data = graphData.reduce((acc, item) => {
        if (!acc[item.Xaxies]) {
          acc[item.Xaxies] = { name: item.Xaxies, total: 0 };
        }
        acc[item.Xaxies][item.yaxies] = item.percentage;
        acc[item.Xaxies].total = Math.max(
          acc[item.Xaxies].total,
          item.percentage
        );
        return acc;
      }, {});

      const filteredArr = Object.values(data);

      const _keys = Object.keys(
        filteredArr.reduce((acc, item) => Object.assign(acc, item), {})
      );

      setKeys(_keys);
      setDataList(filteredArr);
    } else {
      setKeys([]);
      setDataList([]);
    }
  }, [graphData]);

  useEffect(() => {
    if (Array.isArray(keys) && colors[keys[2]]) {
      const color = colors[keys[2]];
      setTopicBarColor(color);
      setSubTopicBarColor(color);
    }
  }, [keys, colors]);

  const onClick = (moduleName, e) => {
    if (moduleName === "total") return;

    let color = colors[moduleName] || "";
    if (!color) {
      if (e.type === "monotone") color = e.stroke;
      else if (e.type === "line") color = e.color;
    }

    if (color) {
      setTopicBarColor(color);
      setSubTopicBarColor(color);
    }

    subTopicGraph({ userName, moduleName });
    topicGraph({ userName, moduleName });
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          data={dataList}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              padding: "12px 16px",
              border: "1px solid #e0e0e0",
            }}
            itemStyle={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
            labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
            nameStyle={{ marginRight: "8px" }}
            valueStyle={{ fontWeight: "bold" }}
          />
          <Legend
            onClick={(e) => {
              onClick(e.value, e);
            }}
            wrapperStyle={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              color: "#666666",
              fontWeight: 600,
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          />

          <Bar
            dataKey={"total"}
            key="total"
            fill={moduleBarColor || "#1d42a2"}
          />

          {keys.map((_key, index) => {
            if (index > 1)
              return (
                <Line
                  cursor="pointer"
                  type="monotone"
                  dataKey={_key}
                  key={_key}
                  stroke={colors[_key] || getRandomColor(_key)}
                  strokeWidth={4}
                  dot={{ r: 4 }}
                  onClick={(e) => onClick(_key, e)}
                  connectNulls
                />
              );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapState = (state) => ({
  userName: state.user.userName,
  graphData: state.myP_moduleGraph.data,
});

const mapDispatch = {
  topicGraph: myP_graphTopicDispatch,
  subTopicGraph: myP_graphDispatch,
};

const ModuleGraph = connect(mapState, mapDispatch)(ModuleGraphComponent);

export default ModuleGraph;
