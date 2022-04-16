import React from "react";
import { Button, Modal } from "antd";
import UserAvatar from "./Avatar";
import ProfileForm from "./ProfileForm";

const ToolBar = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <div className="d-flex-hz">
      <Button type="primary" shape="round" size="large">
          All
        </Button>
        <div onClick={showModal}>
          <UserAvatar />
        </div>
        <Button type="primary" shape="round" size="large">
          Favourites
        </Button>
      </div>
      
      <Modal
        title={
          <>
            <UserAvatar/>&nbsp;&nbsp;
            Account Settings
          </>
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ProfileForm />
      </Modal>
    </div>
  );
};

export default ToolBar;
