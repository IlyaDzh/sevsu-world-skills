import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Auth, Home } from "pages";

const App = ({ isAuth }) => (
    <div className="wrapper">
        <Switch>
            <Route exact path={["/signin", "/signup"]} component={Auth} />
            <Route
                exact
                path={[
                    "/",
                    "/students",
                    "/student/:id",
                    "/task/:id",
                    "/task/edit/:id"
                ]}
                render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
            />
            <Route render={() => <div>Error</div>} />
        </Switch>
    </div>
);

App.defaultProps = {
    isAuth: true
};

export default App;
