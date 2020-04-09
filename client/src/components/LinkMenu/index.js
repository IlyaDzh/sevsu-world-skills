import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, TeamOutlined, AppstoreOutlined } from "@ant-design/icons";

import "./LinkMenu.scss";

const { SubMenu, Item } = Menu;

const LinkMenu = withRouter(({ location }) => (
    <Menu
        className="menu"
        selectedKeys={[location.pathname === "/" ? "/tasks" : location.pathname]}
        defaultOpenKeys={["subTasks"]}
        mode="inline"
    >
        <Item key="/profile">
            <UserOutlined className="menu__icon" />
            Профиль
            <Link to="/profile" />
        </Item>
        <SubMenu
            key="subTasks"
            title={
                <span>
                    <AppstoreOutlined className="menu__icon" />
                    <span>Задачи</span>
                </span>
            }
        >
            <Item key="/tasks">
                Все задачи
                <Link to="/tasks" />
            </Item>
            <Item key="/completed-tasks">
                Решенные задачи
                <Link to="/completed-tasks" />
            </Item>
            <Item key="/my-tasks">
                Мои задачи
                <Link to="/my-tasks" />
            </Item>
        </SubMenu>
        <Item key="/students">
            <TeamOutlined className="menu__icon" />
            Студенты
            <Link to="/students" />
        </Item>
    </Menu>
));

export default LinkMenu;
