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

const SubTopicGraphComponent = ({ graphData, subTopicBarColor }) => {
  const [dataList, setDataList] = useState([]);
  const [keys, setKeys] = useState([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (Array.isArray(graphData)) {
      const data = graphData.reduce((acc, item) => {
        if (!acc[item.Xaxies]) {
          acc[item.Xaxies] = {
            name: item.Xaxies,
            total: 0,
            count: 0,
            Average: 0,
          };
        }
        acc[item.Xaxies][item.yaxies] = item.percentage;
        acc[item.Xaxies].total = Math.max(
          acc[item.Xaxies].total,
          item.percentage
        );
        acc[item.Xaxies].Average += item.percentage;
        acc[item.Xaxies].count += 1;
        return acc;
      }, {});

      const filteredArr = Object.values(data).map((item) => {
        item.Average =
          item.count > 0 ? (item.Average / item.count).toFixed(2) : 0;
        delete item.count;
        return item;
      });

      const _keys = Object.keys(
        filteredArr.reduce((acc, item) => Object.assign(acc, item), {})
      );

      // Round percentages to 2 decimal places for each data point
      const roundedData = filteredArr.map((item) => {
        const roundedItem = { ...item };
        Object.keys(roundedItem).forEach((key) => {
          if (key !== "name") {
            // Round the percentage value to 2 decimal places
            roundedItem[key] = parseFloat(roundedItem[key]);
              // .toFixed(2));
          }
        });
        return roundedItem;
      });

      setKeys(_keys);
      setDataList(roundedData);
    } else {
      setKeys([]);
      setDataList([]);
    }
  }, [graphData]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={dataList}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick.toFixed(2)}%`} // Round Y-Axis percentage
          />
          <Tooltip
            formatter={(value, name) => {
              return [`${value}%`, `${name}`];
            }} // Round percentage in Tooltip
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
            content={({ payload, label }) => {
              const filteredPayload = payload.filter(
                (item) => item.name !== "total"
              );

              if (filteredPayload.length === 0) {
                return null;
              }

              return (
                <div
                  className="custom-tooltip"
                  style={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "5px",
                    boxShadow: "rgba(0,0,0,0.2) 0px 0px 10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                    {label}
                  </div>
                  {filteredPayload.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>{item.name}:</span>
                      <span>
                        {item.value}% {/* Adjust formatting as needed */}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend
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
          ></Legend>

          <Bar
            dataKey={"total"}
            key="total"
            fill={subTopicBarColor || "#1d42a2"}
          />

          {keys.map((_key, index) => {
            if (index > 1)
              return (
                <Line
                  cursor="pointer"
                  type="monotone"
                  dataKey={_key}
                  key={_key}
                  stroke={getRandomColor()}
                  strokeWidth={4}
                  dot={{ r: 4 }}
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
  graphData: state.myP_graph.data,
});

const SubTopicGraph = connect(mapState)(SubTopicGraphComponent);

export default SubTopicGraph;
