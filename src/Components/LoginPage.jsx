import React from "react";
import { Button, Divider } from "antd";

const LoginPage = () => {
  return (
    <div className="login-body">
      <h2>Plug Assignment</h2>
      <Divider />
      <Button type="dark" shape="round" size="large">
        Google Login
      </Button>
      <br />
      <Button type="dark" shape="round" size="large">
        Anonymous Login
      </Button>
    </div>
  );
};

export default LoginPage;
