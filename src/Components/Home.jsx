import React, { useEffect, useState } from "react";
import { Row, Col, Divider } from "antd";
import Toolbar from "./Toolbar";
import ProfileBody from "./ProfileBody";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import Spinner from "./Spinner";
import { signin, saveProfile, loaded, loading, saveId } from "../actions";
import AuthProvider from "../auth/auth";
import Api from "../utils/api";

const Home = () => {
  const { user } = AuthProvider();
  const { getAllUser, getUser } = Api();
  const isLogged = useSelector((state) => state.isLogged);
  const isLoading = useSelector((state) => state.isLoading);
  const profileData = useSelector((state) => state.profileData);
  const [userList, setUserList] = useState({});

  useEffect(() => {
      // dispatch(loading());
      const users = {}
      getAllUser().then(res => {
        // console.log(res);
        for (let [key, val] of res) {
          users[key] = val
        }
        setUserList(users);
        // dispatch(loaded());
      });
  }, [isLogged, isLoading])
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getUser(user.uid).then(res => {
        let data = {
          name: "User",
          status: "Feeling Good",
          gender: "",
          image: "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg",
        };

        if (res.name !== "") {
          data = res
        }
        dispatch(saveProfile(data));
        dispatch(loaded());
        dispatch(signin());
      })
    }

    else if ("user_profile" in window.localStorage) {
      console.log(window.localStorage["user_profile"]);
      dispatch(saveProfile(JSON.parse(window.localStorage["user_profile"])));
      dispatch(loaded());
      dispatch(signin());
      dispatch(saveId(JSON.parse(window.localStorage["user_profile"])["user_id"]))
      return;
    }
  }, [user]);

  return (
    <>
      {(isLogged) ? (
        <>
          {isLoading ? (
            <div className="d-flex-hz">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="content-body">
                <h2>Hi, {profileData.name === ''? 'User': profileData.name}</h2>
                <Divider />
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                  {Object.entries(userList)?.map(([key, val]) => (
                    <Col key={key} xs={24} sm={12} className="gutter-row">
                      {Object.entries(userList)?.length && <ProfileBody id={key} {...val} />}
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
        <LoginPage />
      )}
    </>
  );
};

export default Home;
