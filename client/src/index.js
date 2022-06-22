import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./lib/Store";
import Application from "./components/Application";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import "./index.scss"

TimeAgo.addDefaultLocale(en)

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Application />
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});

