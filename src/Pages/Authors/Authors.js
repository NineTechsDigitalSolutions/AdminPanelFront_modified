import { useEffect, useState } from "react";
import { Typography, Button, Tag, Image } from "antd";
import { useHistory } from "react-router";
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../../Components/Table/DataTable";
import Layout from "./../../Layout/LayoutMain";
import { GetAllAuthors } from "../../redux";

const Authors = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const AllAuthors = useSelector((state) => state.AuthorReducer.AllAuthors);

  useEffect(() => {
    dispatch(GetAllAuthors());
  }, []);

  console.log(AllAuthors);

  useEffect(() => {
    let tempArr = [];
    AllAuthors?.map((data, ind) => {
      tempArr.push({
        key: data._id,
        srno: ind + 1,
        pic: <Image height={80} width={90} src={data.profilePic} />,
        name: data?.name,
        // designation: data.designation,
        email: data?.email,
        books: data?.books.map((book, ind) =>
          ind > 0 ? "," + book?.name : book?.name
        ),
        address: data?.address && `${data?.address.slice(0, 30)}...`,
        phone: data?.phone,
        // i % 2 === 0 &&
        // ["heaven", "earth", "forest"].map((book) => (
        //   <Tag color={i % 2 === 0 ? "#617a45" : "#B4673B"}>{book}</Tag>
        // )),
        actions: (
          <div className="actions-buttons">
            <Button
              shape={"circle"}
              icon={<EyeFilled />}
              onClick={() => history.push(`/author/${data._id}`)}
            />
            <Button
              shape={"circle"}
              onClick={() =>
                history.push({
                  pathname: "/add-author",
                  state: data,
                })
              }
              icon={<EditFilled />}
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
  }, [AllAuthors]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Profile Picture",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Author Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   key: "designation",
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Books In Library",
      dataIndex: "books",
      key: "books",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  return (
    <Layout active={"authors"}>
      <div className="white-card">
        <div className="justify-between">
          <Typography.Title level={2}>Authors List</Typography.Title>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => history.push("add-author")}
          >
            Add Author
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          width={1200}
          Search={true}
          SearchRoute={"Authors"}
          loader={AllAuthors === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Authors;
