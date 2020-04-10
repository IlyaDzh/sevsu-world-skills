import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const Error = ({ status, title }) => (
    <Result
        status={status}
        title={title}
        subTitle="Извините, данной страницы не существует."
        extra={
            <Button type="primary">
                <Link to="/">Вернуться на главную</Link>
            </Button>
        }
    />
);

export default Error;
