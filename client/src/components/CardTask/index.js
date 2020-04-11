import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card as BaseCard, Tag, Col } from "antd";

import { getConvertTime } from "utils/helpers";
import "./CardTask.scss";

const CardTask = ({ _id, language, title, description, createdAt, performed }) => (
    <Col className="card-row" xs={24} sm={12} md={8} lg={8} xl={6}>
        <BaseCard
            size="small"
            className="card-task"
            title={
                <span className="card-task__title">
                    <img src={require(`assets/icons-${language}.svg`)} alt="lang" />
                    <p>{title}</p>
                </span>
            }
            extra={<Link to={`/task/${_id}`}>Перейти</Link>}
            hoverable
        >
            <p className="card-task__description">{description}</p>
            <div className="card-task__footer">
                <div className="card-task__date">{getConvertTime(createdAt)}</div>
                <div className="card-task__performed">
                    {performed ? (
                        <Tag color="green">Решено</Tag>
                    ) : (
                        <Tag color="red">Не решено</Tag>
                    )}
                </div>
            </div>
        </BaseCard>
    </Col>
);

CardTask.propTypes = {
    _id: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default CardTask;
