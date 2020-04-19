import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { tasksActions, userActions } from "actions";
import { Task as BaseTask, Error } from "components";

const Task = ({
    fetchCurrentTask,
    fetchUserData,
    task,
    completed_tasks,
    error,
    isLoading
}) => {
    const { id } = useParams();

    useEffect(() => {
        if (!completed_tasks.length) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchCurrentTask(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <Error status={404} title={404} />
    ) : (
        task &&
        completed_tasks && (
            <BaseTask
                {...task}
                find={completed_tasks.find(item => item.task._id === task._id)}
            />
        )
    );
};

export default connect(
    ({ tasks, user }) => ({
        task: tasks.currentItem,
        completed_tasks: user.completed_tasks,
        error: tasks.error,
        isLoading: tasks.isLoading
    }),
    {
        ...tasksActions,
        ...userActions
    }
)(Task);
