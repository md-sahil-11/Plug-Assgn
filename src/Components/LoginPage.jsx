import React from "react";
import { Button, Divider } from "antd";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { signin, saveProfile, loaded, loading } from "../actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const createRandomProfile = () => {
    dispatch(signin());

    if ('user_profile' in window.localStorage) {
      console.log(window.localStorage['user_profile'])
      dispatch(saveProfile(JSON.parse(window.localStorage['user_profile'])));
      dispatch(loaded());
      return;
    }
    
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        dispatch(loaded());
        const { name, gender, picture } = data.results[0];
        const profileData = {
          name: `${name.title} ${name.first} ${name.last}`,
          status: "Feeling Good",
          gender: gender,
          image: picture.medium,
        };
        console.log(profileData);

        //storing anonymous profile in localstorage
        window.localStorage.setItem('user_profile', JSON.stringify(profileData));
        dispatch(saveProfile(profileData));
      },
    });
  };

  return (
    <div className="login-body">
      <h2>Plug Assignment</h2>
      <Divider />
      <Button type="dark" shape="round" size="large">
        Google Login
      </Button>
      <br />
      <Button
        type="dark"
        shape="round"
        size="large"
        onClick={createRandomProfile}
      >
        Anonymous Login
      </Button>
    </div>
  );
};

export default LoginPage;
