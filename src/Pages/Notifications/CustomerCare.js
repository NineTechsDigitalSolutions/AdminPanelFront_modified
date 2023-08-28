import { Typography, Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "./../../Components/Table/DataTable";
import { GetAllQuerries } from "../../redux";
import ReplyModal from "../../Components/Modal/ReplyModal";

const CustomerCare = () => {
  const [data, setData] = useState(null);
  const AllQuerries = useSelector(
    (state) => state.NotificationReducer.AllQuerries
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllQuerries());
  }, []);

  console.log(AllQuerries);

  useEffect(() => {
    let tempArr = [];
    AllQuerries?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        name: `${item.user.firstName} ${item.user.lastName}`,
        email: item.user.email,
        notifications: item.query,
        action: item.reply ? (
          <ReplyModal data={item.reply} />
        ) : (
          <ReplyModal id={item._id} />
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllQuerries]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },

    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Query",
      dataIndex: "notifications",
      key: "notifications",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <Layout active="1">
      <div className="white-card">
        <Typography.Title level={2}>Notifications</Typography.Title>
        <DataTable
          columns={columns}
          data={data}
          loader={AllQuerries === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default CustomerCare;
