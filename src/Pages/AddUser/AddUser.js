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
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import {
  createReader,
  getLibrarians,
  UpdateReader,
  GetAllReaders,
  GetAllPackages,
} from "../../redux";

const AddNew = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { Option } = Select;
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const Librarian = useSelector((state) => state.LibrarianReducer.Librarian);
  const Packages = useSelector((state) => state.PackagesReducer.packages);
  const [Loading, setLoading] = useState(false);
  const [Counter, setCounter] = useState(false);
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  // console.log("Librarian ", Librarian);
  // console.log("Packages ", Packages);

  const AllLibrarians = Librarian?.map((data) => data._id);

  const disablePlans = state?.plans.map((data) => data?.plan?._id);

  // console.log("disablePlans", disablePlans);

  if (AllLibrarians) {
    console.log("counter");
    setTimeout(() => {
      setCounter(true);
    }, 2000);
  }

  useEffect(() => {
    dispatch(getLibrarians());
  }, []);

  useEffect(() => {
    dispatch(
      GetAllPackages(
        AllLibrarians && {
          libraries: AllLibrarians,
        }
      )
    );
  }, [Counter]);

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
      ? await dispatch(UpdateReader(payload2, history))
      : await dispatch(createReader(payload, history));
    console.log(payload);
    dispatch(
      GetAllReaders(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    setLoading(false);
  };

  return (
    <Layout active="readers">
      <div className="add-new-main">
        <div className="header">
          <Button
            shape={"circle"}
            icon={<ArrowLeftOutlined />}
            onClick={() => history.go(-1)}
          />
          <h2>{state ? "Update Reader" : "Add New Reader"}</h2>
        </div>
        <div className="add-form-cont">
          <div className="add-new-form white-card">
            <Form
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
                initialValue={state && state.firstName}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Last Name Is Required" }]}
                initialValue={state && state.lastName}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="nic"
                label="NIC"
                initialValue={state && state.nic}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Address Is Required" }]}
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
                initialValue={state && state.phone}
              >
                <Input />
              </Form.Item>
              {/* <Button type="primary" style={{ margin: "10px 0" }}>
                Send OTP
              </Button> */}
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Email Is Required" }]}
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
                >
                  <Input />
                </Form.Item>
              )}
              {/* <Button type="primary" style={{ margin: "10px 0" }}>
                Send Email Verification
              </Button> */}
              <Form.Item
                name="blocked"
                label="Status"
                rules={[{ required: true, message: "Status Is Required" }]}
                initialValue={state && state.blocked}
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
              <Form.Item name="package" label="Package">
                <Select placeholder={state ? "Add Package" : "Select Package"}>
                  {Packages?.map((data) => (
                    <Option
                      value={data._id}
                      disabled={disablePlans?.find((plan) => plan === data._id)}
                    >
                      {" "}
                      {data.name}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <h3>Active Plans</h3>
              {state?.plans.map((data, index) => (
                <div style={{ marginBottom: "10px" }}>
                  {index + 1}) {data.plan?.name}{" "}
                </div>
              ))}

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
