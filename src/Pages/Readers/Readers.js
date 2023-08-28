import { Typography, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import { GetAllReaders, ChangeReaderStatus } from "../../redux";

const Readers = () => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(null);
  const { Option } = Select;
  const history = useHistory();
  const AllReaders = useSelector((state) => state.ReaderReducer.AllReaders);
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  const dispatch = useDispatch();
  // console.log("SelectedLibrary", SelectedLibrary);

  useEffect(() => {
    dispatch(
      GetAllReaders(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
  }, [SelectedLibrary]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  // console.log(Loading);

  useEffect(() => {
    let tempArr = [];
    AllReaders?.map((data, index) => {
      tempArr.push({
        key: data._id,
        srno: index + 1,
        name: `${data.firstName} ${data.lastName}`,
        createdDate: moment(data.CreatedAt).format("MMM Do YYYY"),
        email: data.email,
        phone: data.phone,
        subscribed_plan: data?.plans?.length,
        status:
          data.blocked === true ? (
            <span className="red">Inactive</span>
          ) : (
            <span className="green">Active</span>
          ),
        // changeStatus:
        //   data.blocked === false ? (
        //     <Button
        //       onClick={async () => {
        //         setLoading(index);
        //         await dispatch(
        //           ChangeReaderStatus(data._id, {
        //             libraries: SelectedLibrary,
        //           })
        //         );
        //         setLoading(null);
        //       }}
        //       type="link"
        //       loading={Loading === index ? true : false}
        //       // loading={true}
        //     >
        //       Set Inactive
        //     </Button>
        //   ) : (
        //     <Button
        //       onClick={async () => {
        //         setLoading(index);
        //         await dispatch(
        //           ChangeReaderStatus(data._id, {
        //             libraries: SelectedLibrary,
        //           })
        //         );
        //         setLoading(null);
        //       }}
        //       type="link"
        //       loading={Loading === index ? true : false}
        //       // loading={true}
        //     >
        //       Set Active
        //     </Button>
        //   ),
        action: (
          <div className="actions-buttons">
            <Button
              shape={"circle"}
              icon={<EyeFilled />}
              onClick={() => history.push(`/reader/${data._id}`)}
            />
            <Button
              shape={"circle"}
              icon={
                <EditFilled
                  onClick={() => {
                    history.push({
                      pathname: "/add-user",
                      state: data,
                    });
                  }}
                />
              }
            />
            {/* <Button
                shape={"circle"}
                icon={<DeleteFilled className="color-red" />}
                onClick={() => handleDeleteItem()}
              /> */}
          </div>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllReaders]);

  const handleDeleteItem = (key) => {
    // let arr = [];
    console.log(key);
    let deleted = data?.filter((value, i) => {
      // if (i === key) {
      //   console.log(key);
      // }
      return i !== key;
      // return value.key !== key;
    });
    // console.log(arr);
    setData(deleted);
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "createdDate",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subscribed Plans",
      dataIndex: "subscribed_plan",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: "Change Status",
    //   dataIndex: "changeStatus",
    //   key: "changeStatus",
    // },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <Layout active="readers">
      <div className="white-card readers-main">
        <Typography.Title level={2}>Readers</Typography.Title>
        <div className="select-lib">
          <Button type="primary" onClick={() => history.push("/add-user")}>
            Add User
          </Button>
          {/* <p>Select Library</p>

          <Select
            defaultValue="English"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="sinhala">Sinhala</Option>
            <Option value="english">English</Option>
            <Option value="all">All</Option>
          </Select> */}
        </div>
        <DataTable
          columns={columns}
          data={data}
          width={800}
          pagination={true}
          Search={true}
          SearchRoute={"Readers"}
          loader={AllReaders === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Readers;
