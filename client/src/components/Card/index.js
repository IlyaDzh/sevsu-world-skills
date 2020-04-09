import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card as BaseCard, Col } from "antd";

import "./Card.scss";

const Card = ({ _id, icon, title, description }) => (
    <Col xs={24} sm={12} md={8} lg={8} xl={6}>
        <BaseCard
            hoverable
            size="small"
            title={
                <span className="ant-card__title">
                    <img src={require(`assets/icons-${icon}.svg`)} alt="lang" />
                    <p>{title}</p>
                </span>
            }
            extra={<Link to={`/task/${_id}`}>Перейти</Link>}
        >
            <p className="ant-card__description">{description}</p>
        </BaseCard>
    </Col>
);

Card.propTypes = {
    _id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Card;
