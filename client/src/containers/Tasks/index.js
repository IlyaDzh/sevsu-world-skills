import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { tasksActions, userActions } from "actions";
import { CardTask } from "components";

const Tasks = ({
    fetchTasks,
    fetchUserData,
    tasks,
    completed_tasks,
    error,
    isLoading
}) => {
    useEffect(() => {
        if (!completed_tasks.length) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!tasks.length) {
            fetchTasks();
        }
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
        tasks.length && (
            <Row>
                {tasks.map(item => (
                    <CardTask
                        key={item._id}
                        completed={completed_tasks.some(
                            _ => _.task._id === item._id
                        )}
                        {...item}
                    />
                ))}
            </Row>
        )
    );
};

export default connect(
    ({ tasks, user }) => ({
        tasks: tasks.items,
        completed_tasks: user.completed_tasks,
        error: tasks.error,
        isLoading: tasks.isLoading
    }),
    {
        ...tasksActions,
        ...userActions
    }
)(Tasks);
