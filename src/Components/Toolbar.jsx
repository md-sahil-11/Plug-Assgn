import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import UserAvatar from "./Avatar";
import ProfileForm from "./ProfileForm";
import AuthProvider from "../auth/auth";
import { useSelector } from "react-redux";
import firebase from "firebase/app";

const ToolBar = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const { user } = AuthProvider();
  const profileData = useSelector((state) => state.profileData);
  
  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (user && profileData.name === '') {
      setVisible(true);
    }
  }, [user])

  const handleOk = () => {
    setConfirmLoading(true);
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
