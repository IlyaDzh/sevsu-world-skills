import React from "react";
import { Route } from "react-router-dom";

import { LoginForm, RegisterForm } from "containers";
import "./Auth.scss";

const Auth = () => (
    <section className="auth">
        <Route exact path="/signin" component={LoginForm} />
        <Route exact path="/signup" component={RegisterForm} />
    </section>
);

export default Auth;
