import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { signin, signout, saveProfile, loaded, loading } from "../actions";

const AuthProvider = () => {
  const auth = firebase.auth();
  const dispatch = useDispatch();

   const [user] = useAuthState(auth);

   const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

   const signOut = () => {
       if (user) auth.signOut();
       else dispatch(signout());
  };

   const signInWithRandomProfile = () => {
    dispatch(signin());

    if ("user_profile" in window.localStorage) {
      console.log(window.localStorage["user_profile"]);
      dispatch(saveProfile(JSON.parse(window.localStorage["user_profile"])));
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
        window.localStorage.setItem(
          "user_profile",
          JSON.stringify(profileData)
        );
        dispatch(saveProfile(profileData));
      },
    });
  };

  return {
    signInWithGoogle,
    signInWithRandomProfile,
    signOut,
    user
  }
};

export default AuthProvider;