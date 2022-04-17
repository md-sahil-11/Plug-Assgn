import React from "react";
import Home from "./Components/Home";
import "antd/dist/antd.css";

import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA7CSH-KA5k8WynQ_eEmY67740uXPXgVYQ",
  authDomain: "plug-assgn.firebaseapp.com",
  databaseURL: "https://plug-assgn-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "plug-assgn",
  storageBucket: "plug-assgn.appspot.com",
  messagingSenderId: "498965248115",
  appId: "1:498965248115:web:557a62f7fc7ce6c67e1206"
})

const store = createStore(allReducers);

const App = () => (
  
  <Provider store={ store }>
    <div id="app">
      <Home />
    </div>
  </Provider>
);

export default App;
