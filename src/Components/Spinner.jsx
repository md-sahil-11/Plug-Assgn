import React from "react";
// import { useSelector } from "react-redux";
import { Spin, Space } from "antd";

const Spinner = () => {
  // const profileData = useSelector((state) => state.profileData);

  return (
    <Space size="middle">
      <Spin size="large" />
    </Space>
  );
};

export default Spinner;
