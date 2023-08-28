import { useState, useEffect } from "react";
import { Typography, Form, Input, Select } from "antd";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";

import { createPackage, UpdatePackage, getLibrarians } from "../../redux";
import Layout from "./../../Layout/LayoutMain";

const AddNewPackage = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const Librarian = useSelector((state) => state.LibrarianReducer.Librarian);

  useEffect(() => {
    dispatch(getLibrarians());
  }, []);
  const AllLibrarians = Librarian?.map((data) => data._id);

  const onFinish = async (values) => {
    setLoading(true);
    const payload = values;
    const payload2 = values;
    payload2.id = state?._id;
    payload.library =
      payload.library === "All" ? AllLibrarians : [payload.library];

    state
      ? await dispatch(UpdatePackage(payload2, history))
      : await dispatch(createPackage(payload, history));
    form.resetFields();
    setLoading(false);
  };

  return (
    <Layout active="p-settings">
      <div className="white-card">
        <Button
          shape="circle"
          onClick={() => history.go(-1)}
          icon={<ArrowLeftOutlined />}
        />
        <Typography.Title level={2}>
          {state ? "Update Package" : "Add New Package"}
        </Typography.Title>
        <div>
          <Form
            //   {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
            initialValues={state && state}
          >
            <Form.Item
              name="name"
              label="Package Name"
              rules={[{ required: true, message: "Package Name Is Required" }]}
              requiredMark={"optional"}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="planType"
              label="planType"
              rules={[{ required: true, message: "planType Is Required" }]}
              requiredMark={"optional"}
              // initialValue={state?.category._id}
            >
              <Select allowClear placeholder="select planType">
                <Option value="Months"> Months </Option>
                <Option value="Weeks"> Weeks </Option>
                <Option value="Year"> year </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="duration"
              label="Package Duration"
              rules={[
                { required: true, message: "Package Duration Is Required" },
              ]}
              requiredMark={"optional"}
            >
              <Input type={"number"} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Package Amount"
              rules={[
                { required: true, message: "Package Amount Is Required" },
              ]}
              requiredMark={"optional"}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              name="description"
              label="Package Description"
              rules={[{ required: true, message: "Description Is Required" }]}
              requiredMark={"optional"}
            >
              <Input.TextArea />
            </Form.Item> */}

            <Form.Item
              name="library"
              label="Library Access Type"
              rules={[
                { required: true, message: "Library Access Is Required" },
              ]}
              requiredMark={"optional"}
              initialValue={
                state?.libraries.length > 0
                  ? "All"
                  : state?.libraries.map((data) => data.name)
              }
            >
              <Select placeholder="Select Library">
                {Librarian?.map((data) => (
                  <Option value={data._id}> {data.name} </Option>
                ))}
                <Option value="All">All</Option>
              </Select>
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

export default AddNewPackage;
