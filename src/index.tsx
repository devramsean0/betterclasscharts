/* @refresh reload */

import "./App.css";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import Home from "./routes/Home";
import Login from "./routes/Login";
render(() =>
    <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
    </Router>,
document.getElementById("root") as HTMLElement);
