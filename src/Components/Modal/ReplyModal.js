import { useState, useEffect } from "react";
import { Modal, Button, Typography, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { ReplyQuerry } from "../../redux";

const ReplyModal = ({ id, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(data && data);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const payload = {
      id: id,
      reply: Message,
    };
    await dispatch(ReplyQuerry(payload));
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        // style={margin && { margin: "0 5px" }}
      >
        {data ? "Show Reply" : "Reply"}
      </Button>
      <Modal
        title={
          <Typography.Title className="black" level={3}>
            Reply
          </Typography.Title>
        }
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <Input.TextArea
          rows={10}
          style={{ resize: "none" }}
          placeholder={`Reply`}
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {!data && (
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            className="Save-Btn"
            loading={Loading}
          >
            send
          </Button>
        )}
      </Modal>
    </>
  );
};

export default ReplyModal;
