import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

import "./Task.scss";

SyntaxHighlighter.registerLanguage('javascript', js);

const Task = ({ owner: { _id, fullname }, language, title, description, code }) => (
    <div className="task">
        <div className="task-info">
            <div className="task-info__item">
                <h4>Название:</h4>
                <p>{title}</p>
            </div>
            <div className="task-info__item">
                <h4>Язык:</h4>
                <p>{language}</p>
            </div>
            <div className="task-info__item">
                <h4>Описание:</h4>
                <p>{description}</p>
            </div>
            <div className="task-info__item">
                <h4>Создатель задачи:</h4>
                <Link to={`/student/${_id}`}>{fullname}</Link>
            </div>
        </div>
        <div className="solution">
            <Divider className="divider" orientation="left">
                Решение
            </Divider>
            <SyntaxHighlighter language="javascript" style={docco}>
                {code}
            </SyntaxHighlighter>
        </div>
    </div>
);

Task.propTypes = {
    owner: PropTypes.object,
    language: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string
};

export default Task;
