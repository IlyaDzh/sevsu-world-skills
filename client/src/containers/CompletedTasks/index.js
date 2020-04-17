import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { userActions } from "actions";
import { CardTask } from "components";

const CompletedTasks = ({ fetchUserData, completed_tasks }) => {
    useEffect(() => {
        if (!completed_tasks.length) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="completed-tasks">
            {completed_tasks && completed_tasks.length ? (
                <Row>
                    {completed_tasks.map(item => (
                        <CardTask key={item._id} completed={true} {...item.task} />
                    ))}
                </Row>
            ) : (
                <div>Загрузка...</div>
            )}
        </div>
    );
};

export default connect(
    ({ user }) => ({
        completed_tasks: user.completed_tasks
    }),
    userActions
)(CompletedTasks);
