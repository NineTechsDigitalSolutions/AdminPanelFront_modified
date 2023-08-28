import { Image, Typography, Button } from "antd";
import { useState, useEffect } from "react";
import { EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "./../../Components/Table/DataTable";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { GetAllOrders } from "../../redux";

const Orders = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const AllOrders = useSelector((state) => state.ProductReducer.AllOrders);

  useEffect(() => {
    dispatch(GetAllOrders());
  }, []);

  useEffect(() => {
    let tempArr = [];
    AllOrders?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        name: item.product.name,
        user: `${item.user.firstName} ${item.user.lastName}`,
        quantity: item.quantity,
        amount: item.totalAmount,
        status: item.status,
        // action: (
        //   <div className="actions-buttons">
        //     {/* <Button shape={"circle"} icon={<EditFilled />} /> */}
        //     <Button
        //       shape={"circle"}
        //       icon={<DeleteFilled className="color-red" />}
        //     />
        //   </div>
        // ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllOrders]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];
  return (
    <Layout active="orders">
      <div className="white-card">
        <Typography.Title level={2}>Orders List</Typography.Title>
        <DataTable
          columns={columns}
          data={data}
          width={800}
          loader={AllOrders === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Orders;
