import React from "react";
import { Row, Col, Divider, Layout } from "antd";
import Toolbar from "./Toolbar";
import ProfileBody from "./ProfileBody";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";

const Home = () => {
  const isLogged = useSelector((state) => state.isLogged);
  return (
    <>
      {isLogged ? (
        <>
          <div className="content-body">
            <h2>Hi, </h2>
            <Divider />
            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {["", "", ""].map((item, idx) => (
                <Col xs={24} sm={12} className="gutter-row">
                  <ProfileBody key={idx} />
                </Col>
              ))}
            </Row>
          </div>
          <br />
          <br />
          <div className="toolbar">
            <Toolbar />
          </div>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
};

export default Home;
