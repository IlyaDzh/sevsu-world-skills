import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";

import { tasksActions, userActions } from "actions";
import BaseTask from "../components/Task";
import { Error } from "components";

const Task = ({
    fetchCurrentTask,
    fetchUserData,
    setError,
    task,
    completed_tasks,
    error,
    isLoading
}) => {
    const { id } = useParams();

    useEffect(() => {
        if (!completed_tasks) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchCurrentTask(id);
        return () => setError(false);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <Spin size="large" />
    ) : error ? (
        <Error status={404} title={404} />
    ) : (
        task &&
        completed_tasks && (
            <BaseTask
                find={completed_tasks.find(item => item.task._id === task._id)}
                {...task}
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
