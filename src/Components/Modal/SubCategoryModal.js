import { useState, useEffect } from "react";
import { Modal, Button, Typography, Input, Select } from "antd";
import { PlusCircleFilled, PlusOutlined, EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import swal from "sweetalert";

import { createCategory, UpdateCategory, GetCategoriesByID } from "../../redux";

const SubCategoryModal = ({ type, PreviousData }) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Category, setCategory] = useState(null);
  const CategoryOption = useSelector(
    (state) => state.CategoryReducer.ALLCategoriesById
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategoriesByID());
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setName(PreviousData?.name);
    setCategory(PreviousData?.mainCat);
    console.log("PreviousData", PreviousData);
  };

  const handleOk = async () => {
    setLoading(true);
    let payload = {
      name: name,
      mainCat: Category,
      categoryType: "sub",
    };
    let payload2 = {
      name: name,
      mainCat: Category,
      id: PreviousData?._id,
    };
    console.log(payload);
    if (name) {
      PreviousData
        ? await dispatch(UpdateCategory(payload2))
        : await dispatch(createCategory(payload));
      setLoading(false);
      setIsModalVisible(false);
      setName("");
      setCategory(null);
    } else {
      swal("", "Fill All Fields Correctly", "error");
      setLoading(false);
      setCategory(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onChange(value) {
    console.log(`selected ${value}`);
    setCategory(value);
  }

  return (
    <div className="category-modal">
      {type ? (
        <span onClick={showModal}>{PreviousData?.name}</span>
      ) : (
        <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />}>
          Add Sub Category
        </Button>
      )}
      <Modal
        title={
          <Typography.Title level={3} className="black">
            {PreviousData ? "Update Sub Category" : "Add Sub Category"}
          </Typography.Title>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <br />
        <p className="black">Category Name</p>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          defaultValue={PreviousData?.mainCat}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {CategoryOption?.map((data) => (
            <Option value={data._id}>{data.name}</Option>
          ))}
        </Select>
        <br />
        <br />
        <p className="black">Sub Category Name</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        {/* <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">E-Books</Option>
          <Option value="e">E-Magazines</Option>
          <Option value="lucy">Audio Books</Option>
        </Select> */}
        {/* <Button
          icon={<PlusOutlined />}
          style={{ margin: "10px 0 0 0", border: "none" }}
        >
          Add New Sub Category
        </Button> */}
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleOk}
          className="Save-Btn"
          loading={Loading}
        >
          {PreviousData ? "Update" : "ADD"}
        </Button>
      </Modal>
    </div>
  );
};

export default SubCategoryModal;
