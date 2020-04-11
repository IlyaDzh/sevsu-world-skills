import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { userActions } from "actions";
import { CardTask } from "components";

const MyTasks = ({ fetchUserData, data, error, isLoading }) => {
    useEffect(() => {
        if (!data) {
            fetchUserData();
        }
    }, [data]);

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
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
        data: user.data,
        error: user.error,
        isLoading: user.isLoading
    }),
    userActions
)(MyTasks);
