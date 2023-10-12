import { useState, useEffect } from "react";
import { Typography, Select, Button, Image, Switch, Radio } from "antd";
import { useHistory } from "react-router";
import {
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import DataTable from "./../../Components/Table/DataTable";
import {
  GetAllBooks,
  ChangeBookStatus,
  GetAllBooksByType,
  GetMaterial,
  DeleteBook,
} from "../../redux";

const Books = () => {
  const AllBooks = useSelector((state) => state.BooksReducer.AllBooks);
  const { Option } = Select;
  const history = useHistory();
  const [data, setData] = useState(null);
  const [type, setType] = useState("E-Book");
  const dispatch = useDispatch();
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  const MaterialOption = useSelector((state) => state.CategoryReducer.Material);

  // console.log("MaterialOption", MaterialOption);
  useEffect(() => {
    dispatch(GetMaterial());
    dispatch(
      GetAllBooks(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
  }, [SelectedLibrary]);

  useEffect(() => {
    console.log("fjdfhdj",AllBooks);
    let tempArr = [];
    AllBooks?.map((item, i) => {
      // console.log("ItemId123",item.category)
      tempArr.push({
        key: item._id,
        srno: i + 1,
        image: <Image height={80} width={100} src={item?.frontCover} />,
        name: item.name,
        author: item.author.name,
        //category: item.category.name,
        category: item.category?.name || "N/A",
        type: item.subCategory[0].name,
        library: item.viewInLibrary ? (
          <Switch
            defaultChecked
            onChange={(checked) =>
              dispatch(
                ChangeBookStatus(item._id, {
                  libraries: SelectedLibrary,
                })
              )
            }
          />
        ) : (
          <Switch
            onChange={(checked) =>
              dispatch(
                ChangeBookStatus(item._id, {
                  libraries: SelectedLibrary,
                })
              )
            }
          />
        ),
        frequency: item.viewFrequency,
        actions: (
          <div className="actions-buttons">
            <Button
              shape={"circle"}
              icon={<EyeFilled />}
              onClick={() => history.push(`/material/${item._id}`)}
            />
            <Button
              shape={"circle"}
              icon={<EditFilled />}
              onClick={() =>
                history.push({
                  pathname: "/add-material",
                  state: item,
                })
              }
            />
            <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
              onClick={() =>
                dispatch(
                  DeleteBook(
                    { id: item._id, authorId: item.author._id },
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
    console.log("Array",tempArr)
  }, [AllBooks]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Book Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "View Library",
      dataIndex: "library",
      key: "library",
    },
    {
      title: "View Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const handleTabChange = (e) => {
    setType(e.target.value);
  };

  const GetBooksByType = (type) => {
    sessionStorage.setItem("MaterialId", type);
    dispatch(
      GetAllBooksByType(
        SelectedLibrary && {
          libraries: SelectedLibrary,
          type: type,
        }
      )
    );
  };
  return (
    <Layout active="books">
      <div className="books-main white-card">
        <Typography.Title level={2}>Materials Listing</Typography.Title>
        <div className="justify-between"></div>
        <div style={{ marginTop: "20px" }}>
          <Radio.Group
            defaultValue="E-Book"
            buttonStyle="solid"
            onChange={handleTabChange}
            value={type}
            // className="editor-radio-button"
          >
            {MaterialOption?.map((mat) => (
              <Radio.Button
                value={mat.name}
                onClick={() => GetBooksByType(mat._id)}
              >
                {mat.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="justify-between">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push("/add-material");
              sessionStorage.setItem("bookType", type);
            }}
            style={{ margin: "20px 0" }}
          >
            Add New {type}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                GetAllBooks(
                  SelectedLibrary && {
                    libraries: SelectedLibrary,
                  }
                )
              );
              setType(null);
            }}
            style={{ margin: "20px 0" }}
          >
            Get All Books
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          width={1200}
          pagination={true}
          Search={true}
          SearchRoute={"Book"}
          loader={AllBooks === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Books;
