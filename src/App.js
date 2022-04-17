import React from "react";
import Home from "./Components/Home";
import "antd/dist/antd.css";

import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(allReducers);

const App = () => (
  <Provider store={ store }>
    <div id="app">
      <Home />
    </div>
  </Provider>
);

export default App;
