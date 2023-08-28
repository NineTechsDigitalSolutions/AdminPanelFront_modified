import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/charts";

const ColumnChart = ({ Data }) => {
  const Arr = [];
  Data?.map((item) => {
    Arr.push({
      type: item.month,
      sales: item.value,
    });
  });
  // console.log(data)

  const config = {
    data: Arr,
    xField: "type",
    yField: "sales",
    // color: "blue",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: "gray",
        },
      },
    },
    meta: {
      type: {
        alias: "abc",
      },
      sales: {
        alias: "xyz",
      },
    },
  };
  return <Column {...config} loading={Arr.length > 0 ? false : true} />;
};

export default ColumnChart;
