import { useState, useEffect } from "react";
import { Button, Typography, Form, Input, Upload, Modal, Select } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../Layout/LayoutMain";
import {
  createProduct,
  UpdateProduct,
  GetAllProductCategories,
} from "../../redux";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const AddNewProduct = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileListArr, setFileList] = useState([]);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const AllCategory = useSelector(
    (state) => state.ProductCategoryReducer.AllProductCategories
  );

  useEffect(() => {
    dispatch(GetAllProductCategories());
    let arr = [];
    if (state?.images.length > 0) {
      state.images.map((img, i) => {
        arr.push({
          url: img,
        });
      });
    }
    setFileList(arr);
  }, []);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  console.log(AllCategory);
  console.log(state && state);

  // const handlePreview = async (file, type) => {
  //   console.log("58", file, type);
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setPreviewImage(file?.url || file?.preview);
  //   setPreviewTitle(
  //     file?.name || file?.url.substring(file?.url.lastIndexOf("/") + 1)
  //   );

  //   setPreviewVisible(true);
  // };

  const handleChange = (fileList) => {
    console.log(`change`, fileList);
    if (fileList) {
      fileList.file.status = "success";
      setFileList(fileList.fileList);
    }
  };

  console.log(`fileList`, fileListArr);

  const onFinish = async (values) => {
    setLoading(true);
    let imgArr = [];
    let payload = new FormData();
    payload.append("description", values.description);
    payload.append("category", values.category);
    payload.append("price", values.price);
    payload.append("name", values.name);
    state && payload.append("id", state?._id);
    fileListArr?.map((file) => {
      file.status === "success" &&
        payload.append("pictures", file.originFileObj);
    });
    fileListArr?.map((img) => {
      img.status !== "success" && imgArr.push(img.url);
    });
    console.log(imgArr);
    payload.append("existingImages", JSON.stringify(imgArr));

    state
      ? await dispatch(UpdateProduct(payload, history))
      : await dispatch(createProduct(payload, history));
    form.resetFields();
    setFileList(null);
    setLoading(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Layout active={"shop"}>
      <div className="white-card">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
        />
        <Typography.Title level={2}>
          {state ? "Update Product" : "Add New Product"}
        </Typography.Title>
        <div className="add-new-form white-card">
          <Form
            //   {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError={true}
          >
            <Form.Item
              name="name"
              label="name"
              rules={[{ required: true, message: "Book Name Is Required" }]}
              requiredMark={"optional"}
              initialValue={state?.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="price"
              rules={[{ required: true, message: "Price Is Required" }]}
              requiredMark={"optional"}
              initialValue={state?.price}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="description"
              rules={[{ required: true, message: "Description Is Required" }]}
              requiredMark={"optional"}
              initialValue={state?.description}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="category"
              label="category"
              rules={[{ required: true, message: "category Is Required" }]}
              requiredMark={"optional"}
              initialValue={state?.category._id}
            >
              <Select placeholder="select Category">
                {AllCategory?.map((data) => (
                  <Option value={data._id}> {data.name} </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="image" label="image">
              <div>
                <Upload
                  listType="picture-card"
                  onChange={handleChange}
                  fileList={fileListArr}
                  customRequest={() => {}}
                  // showUploadList={{ showPreviewIcon: false }}
                  accept="image/*"
                  multiple
                  maxCount={5}
                >
                  {fileListArr?.length >= 5 ? null : uploadButton}
                </Upload>
              </div>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>

            <Form.Item>
              <Button loading={Loading} type="primary" htmlType="submit">
                {state ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewProduct;
