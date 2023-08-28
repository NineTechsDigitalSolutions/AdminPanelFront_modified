import { Button, Typography, Form, Input, Upload, Modal, Select } from "antd";

import { EditFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import Layout from "./../../Layout/LayoutMain";
import {} from "../../redux";

const Profile = () => {
  const { state } = useLocation();
  const [form] = Form.useForm();

  console.log("state", state);

  const onFinish = async (values) => {
    // setLoading(true);
    // let payload = {
    //   ...values,
    //   id: state?._id,
    // };
    // state
    //   ? await dispatch(UpdateProductCategory(payload, history))
    //   : await dispatch(createProductCategory(values, history));
    // form.resetFields();
    // setLoading(false);
  };

  return (
    <Layout active={"Profile"}>
      <div className="profile-card">
        <div className="inner-card">
          <Typography.Title level={2}>Profile</Typography.Title>
          <div className="add-new-form ProfileForm">
            <Form
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              layout="vertical"
              scrollToFirstError={true}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Name Is Required",
                  },
                ]}
                requiredMark={"optional"}
                initialValue={state?.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email Is Required",
                  },
                ]}
                requiredMark={"optional"}
                initialValue={state?.email}
              >
                <Input disabled />
              </Form.Item>
              {state?.address && (
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Address Is Required",
                    },
                  ]}
                  requiredMark={"optional"}
                  initialValue={state?.address}
                >
                  <Input />
                </Form.Item>
              )}
              {state?.phone && (
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Phone Is Required",
                    },
                  ]}
                  requiredMark={"optional"}
                  initialValue={state?.phone}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
