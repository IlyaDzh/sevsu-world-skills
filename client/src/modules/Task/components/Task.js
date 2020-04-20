import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

import { Button } from "components";
import { ModalAddSolution } from "containers";
import "./Task.scss";

SyntaxHighlighter.registerLanguage("javascript", js);

const Task = ({
    _id: task_id,
    owner: { _id: owner_id, fullname },
    language,
    title,
    description,
    find
}) => {
    const [visible, setVisible] = useState(false);

    return (
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
                    <Link to={`/student/${owner_id}`}>{fullname}</Link>
                </div>
            </div>
            <div className="solution">
                <Divider className="divider" orientation="left">
                    {find && find.solution ? "Решение" : "Решение отсутствует"}
                </Divider>
                {find && find.solution ? (
                    <SyntaxHighlighter language="javascript" style={docco}>
                        {find.solution}
                    </SyntaxHighlighter>
                ) : (
                    <>
                        <Button type="primary" onClick={() => setVisible(true)}>
                            Добавить решение
                        </Button>
                        <ModalAddSolution
                            task_id={task_id}
                            visible={visible}
                            setVisible={setVisible}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

Task.propTypes = {
    owner: PropTypes.object,
    language: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    find: PropTypes.object
};

export default Task;
