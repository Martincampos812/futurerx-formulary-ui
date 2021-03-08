import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/style.scss";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "../src/redux/store";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
// import "font-awesome/css/font-awesome.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("page-3-container")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
