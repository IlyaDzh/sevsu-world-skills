import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Empty, Spin } from "antd";

import { tasksActions, userActions } from "actions";
import { CardTask } from "components";

const Tasks = ({ fetchTasks, fetchUserData, tasks, completed_tasks, isLoading }) => {
    useEffect(() => {
        if (!completed_tasks) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!tasks) {
            fetchTasks();
        }
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <Spin size="large" />
    ) : tasks && tasks.length ? (
        <Row>
            {tasks.map(item => (
                <CardTask
                    key={item._id}
                    completed={
                        completed_tasks &&
                        completed_tasks.some(_ => _.task._id === item._id)
                    }
                    {...item}
                />
            ))}
        </Row>
    ) : (
        <Empty style={{ margin: "0 auto" }} description="Нет задач" />
    );
};

export default connect(
    ({ tasks, user }) => ({
        tasks: tasks.items,
        completed_tasks: user.completed_tasks,
        isLoading: tasks.isLoading
    }),
    {
        ...tasksActions,
        ...userActions
    }
)(Tasks);
