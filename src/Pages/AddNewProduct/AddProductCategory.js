import { useState, useEffect } from "react";
import { Button, Typography, Form, Input, Upload, Modal, Select } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../Layout/LayoutMain";
import { createProductCategory, UpdateProductCategory } from "../../redux";

const AddProductCategory = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    let payload = {
      ...values,
      id: state?._id,
    };

    state
      ? await dispatch(UpdateProductCategory(payload, history))
      : await dispatch(createProductCategory(values, history));
    form.resetFields();
    setLoading(false);
  };

  return (
    <Layout active={"shop"}>
      <div className="white-card">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
        />
        <Typography.Title level={2}>
          {state ? "Update Product Category" : "Add New Product Category"}
        </Typography.Title>
        <div className="add-new-form">
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
              rules={[
                {
                  required: true,
                  message: "Product Category Name Is Required",
                },
              ]}
              requiredMark={"optional"}
              initialValue={state?.name}
            >
              <Input />
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

export default AddProductCategory;
