import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, G2 } from "@ant-design/charts";

const UsersChart = () => {
  const G = G2.getEngine("canvas");
  const data = [
    {
      status: "active",
      count: 200,
    },
    {
      status: "inactive",
      count: 300,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "count",
    colorField: "status",
    radius: 0.66,
    color: ["#1890ff", "#f04864"],
    label: {
      content: (obj) => {
        // const group = new G.Group({});
        // group.addShape({
        //   type: "image",
        //   attrs: {
        //     x: 0,
        //     y: 0,
        //     width: 40,
        //     height: 50,
        //     img:
        //       obj.status === "active"
        //         ? "https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png"
        //         : "https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png",
        //   },
        // });
        // group.addShape({
        //   type: "text",
        //   attrs: {
        //     x: 20,
        //     y: 54,
        //     text: obj.status,
        //     textAlign: "center",
        //     textBaseline: "top",
        //     fill: obj.sex === "active" ? "#1890ff" : "#f04864",
        //   },
        // });
        // return group;
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export default UsersChart;
