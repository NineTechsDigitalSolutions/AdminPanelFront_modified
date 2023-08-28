import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/charts";

const DonutChart = ({ Data }) => {
  const Arr = [];
  Data?.map((item) => {
    Arr.push({
      type: item.name,
      value: item.viewFrequency,
    });
  });
  console.log(Data);

  const config = {
    appendPadding: 10,
    data: Arr,
    angleField: "value",
    // theme: "dark",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pres-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "17px",
          fontWeight: "normal",
          color: "var(--text-color)",
        },
        content: "Highest Reading Books",
      },
    },
  };
  return <Pie {...config} loading={Arr.length > 0 ? false : true} />;
};
export default DonutChart;
