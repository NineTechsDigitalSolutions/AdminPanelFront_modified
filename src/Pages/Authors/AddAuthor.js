import { Button, Typography, Form, Input, Upload, Modal, Image } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { BsFileSlides } from "react-icons/bs";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

import { createAuthor, UpdateAuthor } from "../../redux";
import Layout from "../../Layout/LayoutMain";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const AddAuthor = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  console.log(location.state);

  useEffect(() => {
    // if (location.state) {
    //   setFileList((prev) => [...prev, { thumbUrl: location.state }]);
    // }
  }, []);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file, type) => {
    console.log("58", file, type);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file?.url || file?.preview);
    setPreviewTitle(
      file?.name || file?.url.substring(file?.url.lastIndexOf("/") + 1)
    );

    setPreviewVisible(true);
  };
  const handleChange = ({ fileList }) => {
    console.log(fileList);
    if (fileList.length > 0) {
      if (fileList?.[0].status === "uploading") {
        setFileList({ ...fileList[0], status: "success" });
      }
    } else {
      setFileList(null);
    }
  };

  console.log(`fileList`, fileList?.originFileObj);

  const onFinish = async (values) => {
    setLoading(true);
    let payload = new FormData();
    payload.append("description", values.description);
    payload.append("designation", values.designation);
    payload.append("email", values.email);
    payload.append("address", values.address);
    payload.append("phone", values.phone);
    payload.append("name", values.name);
    location?.state && payload.append("id", location?.state._id);
    payload.append("pictures", fileList?.originFileObj);
    location?.state && payload.append("pictures", location?.state.profilePic);

    location?.state
      ? await dispatch(UpdateAuthor(payload, history))
      : await dispatch(createAuthor(payload, history));
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
    <Layout active={"authors"}>
      <div className="white-card">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
        />
        <Typography.Title level={2}>
          {location.state ? "Update Author" : "Add New Author"}
        </Typography.Title>
        <div className="add-new-form white-card">
          <Form
            //   {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError={true}
            initialValues={location?.state}
          >
            <Form.Item
              name="name"
              label="Author Name"
              rules={[{ required: true, message: "Author Name Is Required" }]}
              requiredMark={"optional"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Author Email"
              rules={[{ required: true, message: "Author Email Is Required" }]}
              requiredMark={"optional"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="designation"
              label="Author Designation"
              rules={[
                { required: true, message: "Author Designation Is Required" },
              ]}
              requiredMark={"optional"}
            >
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Author Address">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Contact No.">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Author Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="image" label="Author Image">
              <div style={{ display: "flex" }}>
                <Upload
                  listType="picture-card"
                  fileList={fileList ? [fileList] : []}
                  // onPreview={(file) => handlePreview(file, 1)}
                  onChange={(obj) => handleChange(obj, 1)}
                  accept="image/*"
                  customRequest={() => {}}
                  showUploadList={{ showPreviewIcon: false }}
                  multiple
                  maxCount={1}
                >
                  {fileList ? null : uploadButton}
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
            {location?.state && (
              <Image
                width={100}
                height={100}
                src={location?.state.profilePic}
              />
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={Loading}>
                {location.state ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default AddAuthor;
