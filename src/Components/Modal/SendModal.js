import { useState } from "react";
import { Modal, Button, Typography, Input, DatePicker } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  SendEmailNotification,
  SendPushNotification,
  SendSmsNotification,
} from "../../redux";

const SendModal = ({ title, margin, notificationType }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Message, setMessage] = useState("");
  const [Title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);
  const [schedule, setschedule] = useState(new Date());
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const SelectedReaders = useSelector(
    (state) => state.NotificationReducer.SelectedReader
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log(SelectedReaders);

  const handleOk = async () => {
    setLoading(true);
    const payload = {
      notificationType: notificationType,
      message: Message,
      users: SelectedReaders,
      schedule: schedule,
    };
    const payload2 = {
      notificationType: "notification",
      message: Message,
      users: SelectedReaders,
      schedule: schedule,
    };
    const payload3 = {
      notificationType: notificationType,
      message: Message,
      users: SelectedReaders,
      title: Title,
      schedule: schedule,
    };
    notificationType === "sms" &&
      (await dispatch(SendSmsNotification(payload)));
    notificationType === "push" &&
      (await dispatch(SendPushNotification(payload2)));
    notificationType === "email" &&
      (await dispatch(SendEmailNotification(payload3)));
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setschedule(dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={margin && { margin: "0 5px" }}
      >
        Send {title}
      </Button>
      <Modal
        title={
          <Typography.Title className="black" level={3}>
            Send {title}
          </Typography.Title>
        }
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <DatePicker
          showTime
          onChange={onChange}
          onOk={onOk}
          placeholder="Select Date and Time"
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        {notificationType === "email" && (
          <Input
            placeholder={`Enter Title`}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
        )}
        <Input.TextArea
          rows={10}
          style={{ resize: "none" }}
          placeholder={`Enter ${title}`}
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleOk}
          className="Save-Btn"
          loading={Loading}
        >
          send
        </Button>
      </Modal>
    </>
  );
};

export default SendModal;
