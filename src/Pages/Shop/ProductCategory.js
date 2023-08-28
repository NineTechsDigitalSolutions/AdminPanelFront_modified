import { Image, Typography, Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "./../../Components/Table/DataTable";
import {
  GetAllProductCategories,
  ChangeProductCategoryStatus,
} from "../../redux";
import FormItemLabel from "antd/lib/form/FormItemLabel";

const ProductCategory = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const AllProductCategories = useSelector(
    (state) => state.ProductCategoryReducer.AllProductCategories
  );
  const [Loading, setLoading] = useState("");

  useEffect(() => {
    dispatch(GetAllProductCategories());
  }, []);

  useEffect(() => {
    console.log(AllProductCategories);
    let tempArr = [];
    AllProductCategories?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        name: item.name,
        // price: `$${item.price}`,
        status: item.status ? (
          <span className="green">Active</span>
        ) : (
          <span className="red">Inactive</span>
        ),
        changeStatus: item.status ? (
          <Button
            onClick={() => {
              dispatch(ChangeProductCategoryStatus(item._id));
            }}
            type="link"
          >
            Set Inactive
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(ChangeProductCategoryStatus(item._id));
            }}
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
                  pathname: "/add-new-product-category",
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
  }, [AllProductCategories]);
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    <Layout active={"product-category"}>
      <div className="white-card">
        <Typography.Title level={2}>Shop</Typography.Title>
        <div className="justify-between">
          <Typography.Title level={5}>Product Categories</Typography.Title>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push("/add-new-product-category")}
          >
            Add Product Category
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          Search={true}
          SearchRoute={"ProductCategory"}
          loader={AllProductCategories === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default ProductCategory;
