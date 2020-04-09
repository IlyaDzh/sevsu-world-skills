import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { CodeOutlined } from "@ant-design/icons";

import { LinkMenu, PageHeader } from "components";
import { Tasks } from "containers";
import "./Home.scss";

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Layout.Sider
                className="aside"
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    setCollapsed(broken);
                }}
                trigger={null}
                collapsed={collapsed}
                style={{ overflow: "auto" }}
                width={220}
                collapsible
            >
                <div className="aside__logo">
                    <CodeOutlined />
                    ReactCode
                </div>
                <LinkMenu />
            </Layout.Sider>
            <Layout className="layout">
                <PageHeader
                    collapsed={collapsed}
                    toggleCollapsed={toggleCollapsed}
                />
                <Layout.Content className="layout-content">
                    <Switch>
                        <Route
                            exact
                            path="/profile"
                            render={() => <div>Profile</div>}
                        />
                        <Route exact path={["/", "/tasks"]} component={Tasks} />
                        <Route
                            exact
                            path="/completed-tasks"
                            render={() => <div>Completed tasks</div>}
                        />
                        <Route
                            exact
                            path="/my-tasks"
                            render={() => <div>My tasks</div>}
                        />
                        <Route
                            exact
                            path="/task/:id"
                            render={() => <div>Task</div>}
                        />
                        <Route
                            exact
                            path="/students"
                            render={() => <div>Students</div>}
                        />
                        <Route
                            exact
                            path="/student/:id"
                            render={() => <div>Student</div>}
                        />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Home;
