import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { tasksActions } from "actions";
import { Task as BaseTask } from "components";

const Task = ({ fetchCurrentTask, task, error, isLoading }) => {
    const { id } = useParams();

    useEffect(() => {
        fetchCurrentTask(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
        task && <BaseTask {...task} />
    );
};

export default connect(
    ({ tasks }) => ({
        task: tasks.currentItem,
        error: tasks.error,
        isLoading: tasks.isLoading
    }),
    tasksActions
)(Task);
