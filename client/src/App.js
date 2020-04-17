import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { Error } from "components";
import { Auth, Home } from "pages";

const App = ({ isAuth }) => (
    <div className="wrapper">
        <Switch>
            <Route exact path={["/signin", "/signup"]} component={Auth} />
            <Route
                exact
                path={[
                    "/",
                    "/profile",
                    "/tasks",
                    "/completed",
                    "/my-tasks",
                    "/task/:id",
                    "/students",
                    "/student/:id"
                ]}
                render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
            />
            <Route
                render={() =>
                    isAuth ? (
                        <Error status={404} title={404} />
                    ) : (
                        <Redirect to="/signin" />
                    )
                }
            />
        </Switch>
    </div>
);

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
