import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import "./scss/app.scss";
import App from "./core/app";
import * as serviceWorker from './serviceWorker';

let mountNode = document.getElementById("root");
ReactDOM.render(<App />, mountNode);
serviceWorker.unregister();
