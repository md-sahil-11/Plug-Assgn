import React from "react";
import firebase from "firebase/app";
import { useDispatch } from "react-redux";
import { saveId, deleteId } from "../actions";
import "firebase/database";

const Api = () => {
  const dispatch = useDispatch();
  const addUser = (profileData) => {
    const userRef = firebase.database().ref("Users").push();
    console.log("ADDING USER");
    console.log(userRef.key);
    dispatch(saveId(userRef.key));
    userRef.set({
      ...profileData,
      likes: 0,
      inlikes: 0,
      favourites: JSON.stringify({}),
    });
    // userRef.on("value", (snapshot) => {
    //   const data = snapshot.val();
    //   console.log('API');
    //   console.log(data);
    // });
  };

  const getAllUser = async () => {
    const userRef = firebase.database().ref("Users");
    let userList = {};
    await userRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("GETTING ALL USERS");
      console.log(data);

      userList = data;
    });

    return userList;
  };

  return {
    addUser,
    getAllUser,
  };
};

export default Api;
