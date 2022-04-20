import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import $ from "jquery";
import { useDispatch } from "react-redux";
import {
  signin,
  signout,
  saveProfile,
  loaded,
  loading,
  saveId,
} from "../actions";

import Api from "../utils/api";

const AuthProvider = () => {
  const auth = firebase.auth();
  const dispatch = useDispatch();

  const { addUser, getUser } = Api();

  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    dispatch(loading());
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        var uid = result.user.uid;
        console.log("UID", uid);
        dispatch(signin());
        getUser(uid).then((res) => {
          let profileData = {
            name: "User",
            status: "Feeling Good",
            gender: "",
            image:
              "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg",
            user_id: uid,
          };

          if (res) {
            // const { name, status, gender } = res;
            profileData = {
              ...profileData,
              ...res,
            };
            console.log(res);
            dispatch(saveProfile(profileData));
            dispatch(signin());
            dispatch(loaded());
          } else {
            addUser(profileData).then((res) => {
              dispatch(saveProfile(profileData));
              dispatch(signin());
              dispatch(loaded());
            });
          }
        });
      })
      .catch(function (error) {
        // An error occurred
        console.log(error.message);
        alert("Something went wrong!");
      });
  };

  const signOut = () => {
    if (user) auth.signOut();
    dispatch(signout());
  };

  const signInWithRandomProfile = () => {
    dispatch(loading());

    if ("user_profile" in window.localStorage) {
      console.log(window.localStorage["user_profile"]);
      dispatch(saveProfile(JSON.parse(window.localStorage["user_profile"])));
      dispatch(signin());
      dispatch(loaded());
      return;
    }

    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        const { name, gender, picture } = data.results[0];
        const profileData = {
          name: `${name.title} ${name.first} ${name.last}`,
          status: "Feeling Good",
          gender: gender,
          image: picture.large,
        };
        console.log(profileData);
        //storing anonymous profile in localstorage

        dispatch(saveProfile(profileData));
        addUser(profileData)
          .then((res) => {
            console.log(res);
            dispatch(saveId(res));
            profileData["user_id"] = res;
            window.localStorage.setItem(
              "user_profile",
              JSON.stringify(profileData)
            );
            dispatch(signin());
            dispatch(loaded());
          })
          .catch((err) => {
            console.log(err.message);
            alert("Something went wrong!");
          });
      },
    });
  };

  return {
    signInWithGoogle,
    signInWithRandomProfile,
    signOut,
    user,
  };
};

export default AuthProvider;
