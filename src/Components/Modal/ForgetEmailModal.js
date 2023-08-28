import { useState } from "react";
import { Modal, Button, Typography, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { ForgetEmail } from "../../redux";

const ForgetEmailModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Email, setEmail] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const payload = {
            email: Email
        }
        await dispatch(ForgetEmail(payload , history))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div
                className='link-label'
                onClick={showModal}
            >
                Forgot Password ?
      </div>
            <Modal
                title={
                    <Typography.Title className="black" level={3}>
                        Forget Password
          </Typography.Title>
                }
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={false}
            >
                <Input
                    placeholder={`Enter Email`}
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleOk}
                    className="Save-Btn"
                    loading={Loading}
                >
                    next
        </Button>
            </Modal>
        </>
    );
};

export default ForgetEmailModal;
