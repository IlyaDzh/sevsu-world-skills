import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Empty } from "antd";

import { tasksActions, userActions } from "actions";
import { CardTask } from "components";

const Tasks = ({
    fetchTasks,
    fetchUserData,
    setError,
    tasks,
    completed_tasks,
    error
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
        return () => setError(false);
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    return error ? (
        <Empty style={{ margin: "0 auto" }} description="Нет задач" />
    ) : (
        tasks && tasks.length ? (
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
        ) : null
    );
};

export default connect(
    ({ tasks, user }) => ({
        tasks: tasks.items,
        completed_tasks: user.completed_tasks,
        error: tasks.error
    }),
    {
        ...tasksActions,
        ...userActions
    }
)(Tasks);
