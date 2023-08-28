import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/charts";

const LineChart = ({ Data }) => {
  const Arr = [];
  Data?.map((item) => {
    Arr.push({
      Date: item._id,
      scales: item.count,
    });
  });
  const config = {
    data: Arr,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
    // slider: {
    //   start: 0.1,
    //   end: 0.5,
    // },
  };

  return <Line {...config} loading={Arr.length > 0 ? false : true} />;
};

export default LineChart;
