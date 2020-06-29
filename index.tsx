import { hot } from "react-hot-loader/root";
import React from "react";
import { render } from "react-dom";
import App from "./src/App";

import "./index.scss";

const Component = process.env.HMR ? hot(App) : App;

document.addEventListener("DOMContentLoaded", () => render(<Component />, document.getElementById("root")));
