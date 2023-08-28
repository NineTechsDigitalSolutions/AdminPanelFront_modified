import { Image, Typography, Button } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditFilled } from "@ant-design/icons";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "./../../Components/Table/DataTable";
import { GetAllProducts, ChangeProductStatus } from "../../redux";
import FormItemLabel from "antd/lib/form/FormItemLabel";

const Shop = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const AllProducts = useSelector((state) => state.ProductReducer.AllProducts);

  useEffect(() => {
    dispatch(GetAllProducts());
  }, []);

  useEffect(() => {
    console.log(AllProducts);
    let tempArr = [];
    AllProducts?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        image: item.images && (
          <Image src={item.images[0]} height={100} width={100} />
        ),
        name: item.name,
        category: item.category.name,
        price: `$${item.price}`,
        status:
          item.status === false ? (
            <span className="red">Inactive</span>
          ) : (
            <span className="green">Active</span>
          ),
        changeStatus:
          item.status === true ? (
            <Button
              onClick={() => dispatch(ChangeProductStatus(item._id))}
              type="link"
            >
              Set Inactive
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(ChangeProductStatus(item._id))}
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
                  pathname: "/add-new-product",
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
  }, [AllProducts]);
  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
    <Layout active={"products"}>
      <div className="white-card">
        <Typography.Title level={2}>Shop</Typography.Title>
        <div className="justify-between">
          <Typography.Title level={5}>Products</Typography.Title>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push("/add-new-product")}
          >
            Add New Product
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          Search={true}
          SearchRoute={"Products"}
          loader={AllProducts === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Shop;
