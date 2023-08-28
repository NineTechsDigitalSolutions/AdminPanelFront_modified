import { useState, useEffect } from "react";
import { Typography } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import { GetAllSales } from "../../redux";

const Sales = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const AllSales = useSelector((state) => state.DashboardReducer.AllSales);

  useEffect(() => {
    dispatch(GetAllSales());
  }, []);

  console.log("AllSales", AllSales);

  useEffect(() => {
    let tempArr = [];
    AllSales?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        date: moment(item.CreatedAt).format("MMM Do YYYY"),
        name: `${item.user?.firstName} ${item.user?.lastName}`,
        total: `$${item.amount}`,
        type: item.plan?.name,

        status: item?.plan?.status ? (
          <span className="green">Transaction Success</span>
        ) : (
          <span className="red">Transaction Fail</span>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllSales]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Transaction Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Reader Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <Layout active={"sales"}>
      <div className="white-card">
        <Typography.Title level={2}>Sales</Typography.Title>
        <DataTable
          columns={columns}
          data={data}
          width={1200}
          loader={AllSales === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Sales;
