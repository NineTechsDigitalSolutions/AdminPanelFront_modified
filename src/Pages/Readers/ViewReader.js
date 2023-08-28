import { useState, useEffect } from "react";
import { Typography, Button, Image } from "antd";
import { useParams, useHistory, Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";

import DataTable from "../../Components/Table/DataTable";
import { publicAPI } from "../../API/index";
import Layout from "./../../Layout/LayoutMain";

const ViewReader = () => {
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);
  const [ReaderData, setReaderData] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const res = await publicAPI.get(`/user/get/${id}`);
    if (res) {
      console.log(res.data);
      setReaderData(res.data);
    }
  }, []);

  useEffect(() => {
    let tempArr = [];
    let tempArr2 = [];
    ReaderData?.plans?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        date: moment(item?.subscriptionDate).format("MMM Do YYYY"),
        name: `${item.plan?.name}`,
        total: `$${item.plan?.price}`,
        duration: `${item.plan?.duration} ${item.plan?.planType}`,
      });
    });
    setData(tempArr && tempArr);

    ReaderData?.oldPlans?.map((item, i) => {
      tempArr2.push({
        key: item._id,
        srno: i + 1,
        date: moment(item.expiryDate).format("MMM Do YYYY"),
        name: `${item.plan.name}`,
        total: `$${item.plan.price}`,
        duration: `${item.plan.duration} ${item.plan.planType}`,
      });
    });
    setData2(tempArr2 && tempArr2);
  }, [ReaderData]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Subscription Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
  ];

  const columns2 = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Expiry Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Plan Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <Layout active="readers">
      <div className="View-book">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
          style={{ marginBottom: "10px" }}
        />
        <Typography.Title level={3}></Typography.Title>
        <div style={{ marginTop: "1rem" }} className="info-sec">
          {/* <Image height={120} src={ReaderData?.profilePic} /> */}
          <div className="item">
            <h4>Name :</h4>
            <p className="Hover">
              {" "}
              {ReaderData?.firstName} {ReaderData?.lastName}{" "}
            </p>
          </div>
          <div className="item">
            <h4>Reader Add on :</h4>
            <p> {moment(ReaderData?.CreatedAt).format("MMM Do YYYY")} </p>
          </div>
          <div className="item">
            <h4>Email :</h4>
            <p> {ReaderData?.email} </p>
          </div>
          <div className="item">
            <h4>Phone :</h4>
            <p> {ReaderData?.phone} </p>
          </div>
          <div className="item">
            <h4>NIC :</h4>
            <p> {ReaderData?.nic} </p>
          </div>
          <div className="item">
            <h4>Status :</h4>
            {ReaderData?.blocked ? (
              <p className="Red">Blocked</p>
            ) : (
              <p className="Green">UnBlocked</p>
            )}
          </div>
          <div className="item">
            <h4>Email Verified :</h4>
            {ReaderData?.emailVerified ? (
              <p className="Green">Yes</p>
            ) : (
              <p className="Red">No</p>
            )}
          </div>
          <div className="item">
            <h4>OTP Verified :</h4>
            {ReaderData?.otpVerified ? (
              <p className="Green">Yes</p>
            ) : (
              <p className="Red">No</p>
            )}
          </div>
          <div className="item">
            <h4>Address :</h4>
            <p> {ReaderData?.address} </p>
          </div>
          <div className="item">
            <h4>library :</h4>
            {ReaderData?.libraries?.map((lib, index) => (
              <p> {index === 0 ? lib.name : `,${lib.name}`} </p>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "2rem" }} className="white-card">
          <Typography.Title level={4}>Active Plan</Typography.Title>
          <DataTable
            columns={columns}
            data={Data}
            width={1200}
            pagination={false}
          />
        </div>

        <div style={{ marginTop: "2rem" }} className="white-card">
          <Typography.Title level={4}>Old Plan</Typography.Title>
          <DataTable
            columns={columns2}
            data={Data2}
            width={1200}
            pagination={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ViewReader;
