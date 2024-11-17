/* @refresh reload */

import "./App.css";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import Home from "./routes/Home";
import Login from "./routes/Login";
import AccountSwitcher from "./routes/AccountSwitcher";

import { AccountProvider } from "./contexts/AccountContext";
render(() =>
    <AccountProvider>
        <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/account-switcher" component={AccountSwitcher} />
        </Router>
    </AccountProvider>,
document.getElementById("root") as HTMLElement);
