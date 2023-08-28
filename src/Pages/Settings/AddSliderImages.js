import { useState, useEffect } from "react";
import { Typography, Upload, Modal, Button, Image } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import { useDispatch } from "react-redux";

import Layout from "../../Layout/LayoutMain";
import { createBanner, UpdateBanner } from "../../redux";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const AddSliderImages = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    // setFileList({
    //   url: state?.image
    // });
  }, []);

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
    if (fileList) {
      fileList.file.status = "success";
      setFileList(fileList.fileList);
    }
  };

  const handleAddImage = async () => {
    setLoading(true);
    let payload = new FormData();
    payload.append("pictures", fileList[0].originFileObj);
    state && payload.append("id", state?._id);
    state ? await dispatch(UpdateBanner(payload, history)) : await dispatch(createBanner(payload, history));
    setLoading(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Layout>
      <div className="white-card">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
        />

        <Typography.Title level={2}>Mobile Slider Images</Typography.Title>
        <h3>Add Mobile Slider Images</h3>
        <div>
          <Upload
            listType="picture-card"
            fileList={fileList}
            // onPreview={(file) => handlePreview(file, 1)}
            onChange={(obj) => handleChange(obj, 1)}
            customRequest={() => { }}
            accept="image/*"
            multiple={false}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </div>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        {state && (
          <Image
            width={100}
            height={100}
            src={state.image}
          />
        )}
        <br />
        <br />
        <Button loading={Loading} type="primary" onClick={handleAddImage}>
          {state ? "Update" : "Add"}
        </Button>
      </div>
    </Layout>
  );
};

export default AddSliderImages;
