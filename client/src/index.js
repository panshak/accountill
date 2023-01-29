//Copyright (c) 2022 Panshak Solomon

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18nextConf";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers/";
import Spinner from "./components/Spinner/Spinner";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
