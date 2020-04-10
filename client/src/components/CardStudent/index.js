import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card as BaseCard, Avatar, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./CardStudent.scss";

const CardStudent = ({ _id, fullname, info }) => (
    <Col className="card-row" xs={24} sm={12} md={8} lg={8} xl={6}>
        <BaseCard
            size="small"
            className="card-student"
            title="Студент"
            extra={<Link to={`/student/${_id}`}>Перейти</Link>}
            hoverable
        >
            <BaseCard.Meta
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={fullname}
                description={<p className="card-student__info">{info}</p>}
            />
        </BaseCard>
    </Col>
);

CardStudent.propTypes = {
    _id: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    info: PropTypes.string
};

export default CardStudent;
