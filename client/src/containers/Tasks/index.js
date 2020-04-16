import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { tasksActions } from "actions";
import { CardTask } from "components";

const Tasks = ({ fetchTasks, tasks, error, isLoading }) => {
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
                    <CardTask key={item._id} {...item} performed={true} />
                ))}
            </Row>
        )
    );
};

export default connect(
    ({ tasks }) => ({
        tasks: tasks.items,
        error: tasks.error,
        isLoading: tasks.isLoading
    }),
    tasksActions
)(Tasks);
