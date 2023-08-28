import { useState, useEffect } from "react";
import Layout from "./../../Layout/LayoutMain";
import { Typography, Button, Image } from "antd";
import { EditFilled, PlusOutlined, DeleteFilled } from "@ant-design/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../Components/Table/DataTable";
import { GetBanners } from "../../redux";

const MobileSettings = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const AllBanners = useSelector((state) => state.BannerReducer.AllBanners);

  useEffect(() => {
    dispatch(GetBanners());
  }, []);

  console.log(AllBanners);

  useEffect(() => {
    let tempArr = [];
    AllBanners?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        image: <Image src={item?.image} height={100} width={100} />,

        action: (
          <div>
            <Button
              icon={<EditFilled style={{ color: "var(--primary-color)" }} />}
              shape={"circle"}
              onClick={() =>
                history.push({
                  pathname: "/add-slider",
                  state: item,
                })
              }
            />
            {/* <Button
              icon={<DeleteFilled className="color-red" />}
              shape={"circle"}
            /> */}
          </div>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllBanners]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
      width: 100,
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <Layout active="m-settings">
      <div className="white-card">
        <Typography.Title level={2}>Mobile Settings</Typography.Title>
        <div className="ml-left-flex">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push("/add-slider")}
          >
            Add New Mobile Slider Image
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          loader={AllBanners === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default MobileSettings;
