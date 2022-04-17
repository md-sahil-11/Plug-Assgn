import React from "react";
import { Button, Divider } from "antd";
import AuthProvider from '../auth/auth';

const LoginPage = () => {
  const { signInWithGoogle, signInWithRandomProfile } = AuthProvider();
  return (
    <div className="login-body">
      <h2>Plug Assignment</h2>
      <Divider />
      <Button type="dark" shape="round" size="large" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      <br />
      <Button
        type="dark"
        shape="round"
        size="large"
        onClick={ signInWithRandomProfile }
      >
        Anonymous Login
      </Button>
    </div>
  );
};

export default LoginPage;
