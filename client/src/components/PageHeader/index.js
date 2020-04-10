import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { PageHeader as BasePageHeader } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./PageHeader.scss";

const routes = {
    "profile": "Мой профиль",
    "tasks": "Все задачи",
    "completed-tasks": "Решенные задачи",
    "my-tasks": "Мои задачи",
    "task": "Задача",
    "students": "Все студенты",
    "student": "Студент"
};

const PageHeader = withRouter(({ collapsed, toggleCollapsed, location }) => (
    <BasePageHeader
        className="page-header"
        backIcon={React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
                className: "trigger",
                onClick: toggleCollapsed
            }
        )}
        onBack={() => null}
        title={
            location.pathname.split("/")[1] === ""
                ? routes["tasks"]
                : routes[location.pathname.split("/")[1]]
        }
    />
));

PageHeader.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired
};

export default PageHeader;
