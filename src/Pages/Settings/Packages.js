import { useState, useEffect } from "react";
import { Typography, Button } from "antd";
import { EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import { GetAllPackages, ChangePackageStatus } from "../../redux";

const Packages = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const AllPackages = useSelector((state) => state.PackagesReducer.packages);
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );

  useEffect(() => {
    dispatch(
      GetAllPackages(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
  }, [SelectedLibrary]);

  console.log(AllPackages);

  useEffect(() => {
    let tempArr = [];
    AllPackages?.map((item, i) => {
      tempArr.push({
        key: item._id,
        id: i,
        name: item.name,
        duration: `${item.duration} ${item.planType}`,
        amount: `$${item.price}`,
        // description: item.description,
        status:
          item.status === true ? (
            <span className="green">Active</span>
          ) : (
            <span className="red">Inactive</span>
          ),
        changeStatus:
          item.status === true ? (
            <Button
              onClick={() =>
                dispatch(
                  ChangePackageStatus(item._id, {
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
                  ChangePackageStatus(item._id, {
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
            <Button
              shape={"circle"}
              icon={<EditFilled />}
              onClick={() =>
                history.push({
                  pathname: "/add-package",
                  state: item,
                })
              }
            />
            {/* <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
            /> */}
          </div>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllPackages]);

  const columns = [
    {
      title: "Package Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Package Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
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
  return (
    <Layout active="p-settings">
      <div className="white-card">
        <div className="justify-between">
          <Typography.Title level={2}>Packages</Typography.Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => history.push("/add-package")}
          >
            Add New Package
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          width={800}
          Search={true}
          SearchRoute={"Packages"}
          loader={AllPackages === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Packages;
