import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";
import {
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";

import Layout from "../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import {
  //GetAllLibrarians,
  getLibrarians1,
  ChangeLibrarianStatus,
  ChangeLibrarianByStatus,
  DeleteLibrarian,
} from "../../redux";

const Librarians = () => {
  const { Title } = Typography;
  const [data, setData] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const AllLibrarian = useSelector(
    (state) => state.LibrarianReducer.AllLibrarian
  );
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );

  const onStatusFilter = (status) => {
    status === "All" &&
      // dispatch(
      //   GetAllLibrarians(
      //     SelectedLibrary && {
      //       libraries: SelectedLibrary,
      //     }
      //   )
      // );
      dispatch(
        getLibrarians1()
      );
    status === "Active" &&
      dispatch(
        ChangeLibrarianByStatus({
          status: true,
          libraries: SelectedLibrary && SelectedLibrary,
        })
      );
    status === "InActive" &&
      dispatch(
        ChangeLibrarianByStatus({
          status: false,
          libraries: SelectedLibrary && SelectedLibrary,
        })
      );
  };

  // useEffect(() => {
  //   dispatch(
  //     GetAllLibrarians(
  //       SelectedLibrary && {
  //         libraries: SelectedLibrary,
  //       }
  //     )
  //   );
  // }, [SelectedLibrary]);

  useEffect(() => {
    dispatch(
      getLibrarians1()
    );
  },[]);

  useEffect(() => {
    let tempArr = [];
    AllLibrarian?.map((data, index) => {
      tempArr.push({
        key: data._id,
        srno: index + 1,
        name: `${data.firstName} ${data.lastName}`,
        nic: data.nic,
        createdDate: moment(data.CreatedAt).format("MMM Do YYYY"),
        contact: data.phone,
        email: data.email,
        access: data.restrictions.map((acc, ind) =>
          ind > 0 ? "," + acc : acc
        ),
        library: data.libraries.map((lib, ind) =>
          ind > 0 ? "," + lib.name : lib.name
        ),
        // service: user.service,
        status:
          data.status === true ? (
            <span className="green">Active</span>
          ) : (
            <span className="red">Inactive</span>
          ),
        changeStatus:
          data.status === true ? (
            <Button
              onClick={() =>
                dispatch(
                  ChangeLibrarianStatus(data._id, {
                    libraries: SelectedLibrary,
                  })
                )
              }
              type="link"
            >
              Set Inactive
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch(
                  ChangeLibrarianStatus(data._id, {
                    libraries: SelectedLibrary,
                  })
                )
              }
              type="link"
            >
              Set Active
            </Button>
          ),
        action: (
          <div className="actions-buttons">
            {/* <Button shape={"circle"} icon={<EyeFilled />} /> */}
            <Button
              shape={"circle"}
              icon={<EditFilled />}
              onClick={() => {
                history.push({
                  pathname: "/add-new",
                  state: data,
                });
              }}
            />
            <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
              onClick={() =>
                dispatch(
                  DeleteLibrarian(
                    { id: data._id },
                    {
                      libraries: SelectedLibrary,
                    }
                  )
                )
              }
            />
          </div>
        ),
      });
    });

    setData(tempArr && tempArr);
  }, [AllLibrarian]);

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
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Menu Access",
      dataIndex: "access",
      key: "access",
    },
    {
      title: "Library",
      dataIndex: "library",
      key: "library",
    },
    // {
    //   title: "Service",
    //   dataIndex: "service",
    //   key: "service",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Change Status",
      dataIndex: "changeStatus",
      key: "changeStatus",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
    },
  ];
  const handleDeleteItem = (key) => {
    // console.log(key);
    let deleted = data?.filter((value, i) => {
      console.log(i);
      return i !== key;
    });
    console.log(deleted);
    // setData(deleted);
  };
  return (
    <Layout active="librarians">
      <div className="white-card librarians">
        <Title level={2}>Librarians</Title>
        <div className="top-btns">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push("/add-new")}
          >
            Add New
          </Button>
          <div>
            <Button
              onClick={() => onStatusFilter("All")}
              className="white bg-blue"
            >
              All
            </Button>
            <Button
              onClick={() => onStatusFilter("Active")}
              className="white bg-green"
            >
              Active
            </Button>
            <Button
              onClick={() => onStatusFilter("InActive")}
              className="white bg-red"
            >
              Inactive
            </Button>
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={data}
            width={1200}
            Search={true}
            SearchRoute={"Librarians"}
            loader={AllLibrarian === null ? true : false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Librarians;
