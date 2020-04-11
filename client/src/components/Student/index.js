import React from "react";
import PropTypes from "prop-types";
import { Divider, Row, Empty } from "antd";

import { CardTask } from "components";
import "./Student.scss";

const Student = ({ email, fullname, info, tasks }) => (
    <div className="student">
        <div className="student-info">
            <div className="student-info__item">
                <h4>Имя:</h4>
                <p>{fullname}</p>
            </div>
            <div className="student-info__item">
                <h4>E-mail:</h4>
                <p>{email}</p>
            </div>
            <div className="student-info__item">
                <h4>Информация:</h4>
                <p>{info || "Информация отсутствует"}</p>
            </div>
        </div>
        <div className="student-tasks">
            <Divider className="divider" orientation="left">
                Задачи студента ({tasks.length || "0"})
            </Divider>
            <div className="student-tasks__list">
                <Row>
                    {tasks.length ? (
                        tasks.map(item => <CardTask key={item._id} {...item} />)
                    ) : (
                        <Empty
                            style={{ margin: "0 auto" }}
                            description="Нет задач"
                        />
                    )}
                </Row>
            </div>
        </div>
    </div>
);

Student.propTypes = {
    email: PropTypes.string,
    fullname: PropTypes.string,
    info: PropTypes.string,
    tasks: PropTypes.array
};

export default Student;
