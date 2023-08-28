import Layout from "./../../Layout/LayoutMain";
import { Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "./../../Components/Table/DataTable";
import SendModal from "../../Components/Modal/SendModal";
import { GetAllReaders } from "../../redux";

const BulkNotifications = () => {
  const [data, setData] = useState(null);
  const AllReaders = useSelector((state) => state.ReaderReducer.AllReaders);
  const dispatch = useDispatch();
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );

  useEffect(() => {
    dispatch(
      GetAllReaders(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
  }, [SelectedLibrary]);

  useEffect(() => {
    let tempArr = [];
    AllReaders?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        name: `${item.firstName} ${item.lastName}`,
        email: item.email,
        // action: (
        //   <>
        //     <SendModal title={"Sms"} />
        //     <SendModal title={"Email"} margin={5} />
        //     <SendModal title={"Notification"} />
        //   </>
        // ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllReaders]);

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
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];
  return (
    <Layout active={"2"}>
      <div className="white-card">
        <Typography.Title level={2}>Bulk Notifications</Typography.Title>
        <SendModal title={"Sms"} notificationType={"sms"} />
        <SendModal title={"Email"} notificationType={"email"} margin={5} />
        <SendModal title={"Notification"} notificationType={"push"} />
        <DataTable
          columns={columns}
          data={data}
          selection={true}
          Search={true}
          SearchRoute={"Readers"}
          loader={AllReaders === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default BulkNotifications;
