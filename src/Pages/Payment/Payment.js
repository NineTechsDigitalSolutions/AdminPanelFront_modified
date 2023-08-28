import { Typography } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import { GetAllPayments } from "../../redux";

const Sales = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const AllPayment = useSelector((state) => state.DashboardReducer.AllPayments);

  useEffect(() => {
    dispatch(GetAllPayments());
  }, []);

  console.log(AllPayment);

  useEffect(() => {
    let tempArr = [];
    AllPayment?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        date: moment(item.CreatedAt).format("MMM Do YYYY"),
        name: `${item.user.firstName} ${item.user.lastName}`,
        total: `$${item.order.totalAmount}`,
        type: item.payment_type,
        // status:
        //   i % 2 === 0 ? (
        //     <span className="color-red">Transaction Fail</span>
        //   ) : (
        //     <span className="color-green">Transaction Success</span>
        //   ),
        status: item.payment_status,
        productName: item.product.name,
      });
    });
    setData(tempArr && tempArr);
  }, [AllPayment]);

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
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <Layout active={"payments"}>
      <div className="white-card">
        <Typography.Title level={2}>Payment History</Typography.Title>
        <DataTable
          columns={columns}
          data={data}
          width={1200}
          loader={AllPayment === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Sales;
