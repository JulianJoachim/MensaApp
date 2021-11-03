import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import LocalServiceWorkerRegister from "./sw-register.js";
import HttpsRedirect from "react-https-redirect";


  ReactDOM.render(
  <App />, document.getElementById("root"));

LocalServiceWorkerRegister();
