import React, { useEffect } from "react";
import { Row, Col, Divider } from "antd";
import Toolbar from "./Toolbar";
import ProfileBody from "./ProfileBody";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import Spinner from "./Spinner";
import { signin, saveProfile, loaded, loading } from "../actions";
import AuthProvider from "../auth/auth";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   apiKey: "AIzaSyA7CSH-KA5k8WynQ_eEmY67740uXPXgVYQ",
//   authDomain: "plug-assgn.firebaseapp.com",
//   databaseURL: "https://plug-assgn-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "plug-assgn",
//   storageBucket: "plug-assgn.appspot.com",
//   messagingSenderId: "498965248115",
//   appId: "1:498965248115:web:557a62f7fc7ce6c67e1206"
// })

const Home = () => {
  // const auth = firebase.auth();

  // const [user] = useAuthState(auth);
  const { user } = AuthProvider();

  const isLogged = useSelector((state) => state.isLogged);
  const isLoading = useSelector((state) => state.isLoading);
  const profileData = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const data = {
        name: "",
        status: "",
        gender: "",
        image: "",
      };
      console.log('hereee')
      dispatch(saveProfile(data));
      dispatch(loaded());
      dispatch(signin());
    }

    else if ("user_profile" in window.localStorage) {
      console.log(window.localStorage["user_profile"]);
      dispatch(saveProfile(JSON.parse(window.localStorage["user_profile"])));
      dispatch(loaded());
      dispatch(signin());
      return;
    }
  }, [user]);

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
        <LoginPage />
      )}
    </>
  );
};

export default Home;
