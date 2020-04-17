import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { CodeOutlined } from "@ant-design/icons";

import { LinkMenu, PageHeader } from "components";
import {
    Profile,
    Tasks,
    Task,
    CompletedTasks,
    MyTasks,
    Students,
    Student
} from "containers";
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
                width={210}
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
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path={["/", "/tasks"]} component={Tasks} />
                        <Route exact path="/completed" component={CompletedTasks} />
                        <Route exact path="/my-tasks" component={MyTasks} />
                        <Route exact path="/task/:id" component={Task} />
                        <Route exact path="/students" component={Students} />
                        <Route exact path="/student/:id" component={Student} />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Home;
