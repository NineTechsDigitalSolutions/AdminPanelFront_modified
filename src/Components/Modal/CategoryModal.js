import { useState, useEffect } from "react";
import { Modal, Button, Typography, Input, Checkbox, Row, Col } from "antd";
import { PlusCircleFilled, EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";

import { createCategory, UpdateCategory, GetMaterial } from "../../redux";

const CategoryModal = ({ type, PreviousData, catType }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [material, setMaterial] = useState(null);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const MaterialOption = useSelector((state) => state.CategoryReducer.Material);
  const [selectType, setselectType] = useState("");

  useEffect(() => {
    dispatch(GetMaterial());
  }, []);

  const showModal = () => {
    console.log(PreviousData);
    setMaterial(PreviousData?.material?._id);
    setName(PreviousData?.name);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    let payload = {
      name: name,
      material: material,
    };
    let payload2 = {
      name: name,
      material: material,
      id: PreviousData?._id,
    };
    if (name) {
      PreviousData !== undefined
        ? await dispatch(UpdateCategory(payload2, catType))
        : await dispatch(createCategory(payload, catType));
      setLoading(false);
      setIsModalVisible(false);
      setName("");
      setMaterial("");
    } else {
      swal("", "Fill All Fields Correctly", "error");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="category-modal">
      {type ? (
        <span onClick={showModal}>{PreviousData?.name}</span>
      ) : (
        <Button
          type="primary"
          style={{ marginRight: "1rem" }}
          onClick={showModal}
          icon={<PlusCircleFilled />}
        >
          Add Category
        </Button>
      )}
      <Modal
        title={
          <Typography.Title level={3} className="black">
            {PreviousData ? "Update Category" : "Add Category"}
          </Typography.Title>
        }
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <div style={{ margin: "20px 0" }}>
          <Typography.Title level={5} className="black">
            Material
          </Typography.Title>
          <Checkbox.Group
            value={material}
            onChange={(value) => setMaterial(value[value.length - 1])}
            style={{ width: "100%" }}
            defaultValue={PreviousData?.material?._id}
          >
            <Row gutter={[10, 10]}>
              {MaterialOption?.map((data) => (
                <Col xs={12} md={8}>
                  <Checkbox
                    value={data?._id}
                    onClick={() => setselectType(data.name)}
                  >
                    {data.name}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
        <p className="black">Category Name</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleOk}
          className="Save-Btn"
          loading={Loading}
        >
          {PreviousData ? "Update" : "Create"}
        </Button>
      </Modal>
    </div>
  );
};

export default CategoryModal;
