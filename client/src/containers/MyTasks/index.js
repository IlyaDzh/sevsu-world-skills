import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { userActions } from "actions";
import { CardTask } from "components";

const MyTasks = ({ fetchUserData, data }) => {
    useEffect(() => {
        if (!data) {
            fetchUserData();
        }
    }, [data]);

    return (
        data &&
        data.tasks &&
        data.tasks.length && (
            <Row>
                {data.tasks.map(item => (
                    <CardTask key={item._id} {...item} performed={true} />
                    // таск должен содержать массив id, которые выполнили задание
                    // performed={item.performed.include(data._id)}
                ))}
            </Row>
        )
    );
};

export default connect(
    ({ user }) => ({
        data: user.data
    }),
    userActions
)(MyTasks);
