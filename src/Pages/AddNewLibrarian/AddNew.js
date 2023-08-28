import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Col,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import swal from "sweetalert";
import { updateLocale } from "moment";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import { createLibrarian, getLibrarians, UpdateLibrarian } from "../../redux";

const AddNew = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { Option } = Select;
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const Librarian = useSelector((state) => state.LibrarianReducer.Librarian);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("state ", state && state);

  useEffect(() => {
    dispatch(getLibrarians());
  }, []);
  const AllLibrarians = Librarian?.map((data) => data._id);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinish = async (values) => {
    setLoading(true);
    let payload = {
      ...values,
      libraries:
        values.libraries === "All" ? AllLibrarians : [values.libraries],
    };
    let payload2 = {
      ...values,
      id: state && state._id,
      libraries:
        values.libraries === "All" ? AllLibrarians : [values.libraries],
    };
    state
      ? await dispatch(UpdateLibrarian(payload2, history))
      : await dispatch(createLibrarian(payload, history));
    console.log(payload);
    setLoading(false);
  };
  const menuOptions = [
    "Users",
    "Readers",
    "Categories",
    "Books",
    "Authors",
    "Statics",
    "Sales",
    "Packages",
    "Notifications",
    "Settings",
    "Shop",
    "Payment",
    "Librarians",
  ];
  return (
    <Layout active="librarians">
      <div className="add-new-main">
        <div className="header">
          <Button
            shape={"circle"}
            icon={<ArrowLeftOutlined />}
            onClick={() => history.go(-1)}
          />
          <h2>{state ? "Update Librarian" : "Add New Librarian"}</h2>
        </div>
        <div className="add-form-cont">
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
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "First Name Is required" }]}
                requiredMark={"optional"}
                initialValue={state && state.firstName}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Last Name Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.lastName}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="nic"
                label="NIC"
                rules={[{ required: true, message: "Nic Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.nic}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Address Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.address}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Contact Number"
                rules={[
                  { required: true, message: "Contact Number Is Required" },
                ]}
                requiredMark={"optional"}
                initialValue={state && state.phone}
              >
                <Input />
              </Form.Item>
              <Button disabled type="primary" style={{ margin: "10px 0" }}>
                Send OTP
              </Button>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Email Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.email}
              >
                <Input type={"email"} />
              </Form.Item>
              {state ? (
                <></>
              ) : (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Password Is Required" }]}
                  requiredMark={"optional"}
                  validateStatus={error ? error : null}
                  help={
                    error === "error"
                      ? "Password must be greater than or equal to 8 characters"
                      : null
                  }
                >
                  <Input
                    onChange={(e) => {
                      let input = e.target.value;
                      input.length < 8
                        ? setError("error")
                        : setError("success");
                    }}
                  />
                </Form.Item>
              )}
              <Button disabled type="primary" style={{ margin: "10px 0" }}>
                Send Email Verification
              </Button>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Status Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.status}
              >
                <Select>
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="libraries"
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
                <Select>
                  {Librarian?.map((data) => (
                    <Option value={data._id}> {data.name} </Option>
                  ))}
                  <Option value="All">All</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="restrictions"
                label="Access To Menus"
                valuePropName="checked"
                rules={[{ required: true, message: "Menu Access Is Required" }]}
                requiredMark={"optional"}
                initialValue={state && state.restrictions}
              >
                {/* <Checkbox.Group options={menuOptions}>Users</Checkbox.Group> */}
                <Checkbox.Group
                  style={{ width: "100%" }}
                  // onChange={onChange}
                  defaultValue={state && state.restrictions}
                >
                  <Row gutter={[20, 20]}>
                    {menuOptions.map((menu) => (
                      <Col span={8}>
                        <Checkbox value={menu}>{menu}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={Loading}>
                  {state ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNew;
