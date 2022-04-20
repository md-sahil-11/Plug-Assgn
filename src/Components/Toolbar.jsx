import React, { useEffect } from "react";
import { Button, Modal, message } from "antd";
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
    // if (user) {
      // setVisible(true);
    // }
  }, [user])

  const handleOk = () => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    const { name, gender, status } = profileData;
    console.log("Clicked cancel button");
    // if (name !== '' && gender !== '' && status !== '') 
    setVisible(false);

    // else message.error("Set up your account first.")
  };

  return (
    <div>
      <div className="d-flex-hz">
      {/* <Button type="primary" shape="round" size="large">
          All
        </Button> */}
        <div >
          <UserAvatar />
        </div>
        &nbsp;
        &nbsp;
        <Button type="primary" shape="round" size="large" onClick={showModal}>
          Settings
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
        footer={null}
      >
        <ProfileForm setVisible={setVisible}/>
      </Modal>
    </div>
  );
};

export default ToolBar;
