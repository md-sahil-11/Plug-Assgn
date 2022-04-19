import React from "react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { saveId, deleteId, loaded, loading, saveProfile } from "../actions";
import "firebase/database";

const Api = () => {
  const dispatch = useDispatch();
  const randomUserId = useSelector(state => state.userId)
  const addUser = async (profileData) => {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser !== null) {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref("Users");
        userRef.child(userId).set({
          ...profileData,
          likes: 0,
          unlikes: 0,
          favourites: JSON.stringify({}),
        });
        resolve(true);
        return;
      }
      const userRef = firebase.database().ref("Users").push();
      console.log("ADDING USER");
      console.log(userRef.key);
      // dispatch(saveId(userRef.key));
      const id = userRef.key;
      userRef.set({
        ...profileData,
        likes: 0,
        unlikes: 0,
        favourites: JSON.stringify({}),
      });

      resolve(id);
    });
  };

  const getAllUser = async () => {
    return new Promise((resolve, reject) => {
      const userRef = firebase.database().ref("Users");
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("GETTING ALL USERS");
        console.log(data);

        resolve(data);
      });
    });
  };

  const getUser = async (id) => {
    return new Promise((resolve, reject) => {
      console.log(id);
      const userRef = firebase.database().ref("Users/" + id);
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("GETTING USER");
        console.log(data);
        // dispatch
        resolve(data);
      });
    });
  };

  const updateUser = async (profileData) => {
    return new Promise((resolve, reject) => {
      dispatch(loading());

      if (firebase.auth().currentUser !== null) {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref("Users/" + userId);
        getUser(userId).then((res) => {
          console.log(res);
          userRef.update({
            ...res,
            ...profileData,
          });
          dispatch(loaded());
          resolve(true);
          return;
        });
      } else {
        const data = JSON.parse(window.localStorage["user_profile"]);
        const userId = randomUserId
        const userRef = firebase.database().ref("Users/" + userId);
        getUser(userId).then((res) => {
          console.log(res);
          const newData = {
            ...res,
            ...profileData,
          };
          userRef.update(newData);
          window.localStorage.setItem("user_profile", JSON.stringify(newData));
          dispatch(saveProfile(newData));
          dispatch(loaded());
          resolve(true);
          return;
        });
      }
    });
  };

  return {
    addUser,
    getAllUser,
    getUser,
    updateUser,
  };
};

export default Api;
