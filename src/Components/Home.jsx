import React, { useEffect } from "react";
import { Row, Col, Divider, Layout } from "antd";
import Toolbar from "./Toolbar";
import ProfileBody from "./ProfileBody";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import Spinner from "./Spinner";
import { signin, saveProfile, loaded, loading } from "../actions";

const Home = () => {
  const isLogged = useSelector((state) => state.isLogged);
  const isLoading = useSelector((state) => state.isLoading);
  const profileData = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if ('user_profile' in window.localStorage) {
      console.log(window.localStorage['user_profile'])
      dispatch(saveProfile(JSON.parse(window.localStorage['user_profile'])));
      dispatch(loaded());
      dispatch(signin());
      return;
    }
  }, [])

  return (
    <>
      {isLogged ? (
        <>
          {isLoading ? (
            <div className="d-flex-hz">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="content-body">
                <h2>Hi, {profileData.name}</h2>
                <Divider />
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                  {["", "", ""].map((item, idx) => (
                    <Col key={idx} xs={24} sm={12} className="gutter-row">
                      <ProfileBody />
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
          )}
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
