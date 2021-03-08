import React from "react";
import "./index.css";
import "./assets/style.scss";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import { Provider } from "react-redux";
import store from "../src/redux/store";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

export default function Root(props) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
