import React from "react";
import { Row, Col, Divider, Layout } from "antd";
import Toolbar from "./Toolbar";
import ProfileBody from "./ProfileBody";

const Home = () => {
  return (
    <>
      <div className="content-body">
      <h2>Plug Assgn</h2>
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
  );
};

export default Home;
