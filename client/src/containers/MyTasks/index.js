import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Empty } from "antd";

import { userActions, tasksActions } from "actions";
import { Button, CardTask } from "components";
import { ModalAddTask } from "containers";

const MyTasks = ({
    deleteTask,
    fetchTasks,
    fetchUserData,
    tasks,
    completed_tasks
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!tasks.length) {
            fetchUserData();
        }
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = id => {
        deleteTask(id)
            .then(() => {
                fetchUserData();
                fetchTasks();
            })
            .catch(() => {});
    };

    return (
        <div className="my-tasks">
            <div className="my-tasks__add" style={{ padding: "8px" }}>
                <Button
                    type="primary"
                    className="my-tasks__add-btn"
                    onClick={() => setVisible(true)}
                >
                    Добавить задачу
                </Button>
            </div>
            {tasks && tasks.length ? (
                <Row>
                    {tasks.map(item => (
                        <CardTask
                            key={item._id}
                            completed={completed_tasks.some(
                                _ => _.task._id === item._id
                            )}
                            isMy={true}
                            handleDelete={handleDelete}
                            {...item}
                        />
                    ))}
                </Row>
            ) : (
                <Empty style={{ margin: "0 auto" }} description="Нет задач" />
            )}
            <ModalAddTask visible={visible} setVisible={setVisible} />
        </div>
    );
};

export default connect(
    ({ user }) => ({
        tasks: user.tasks,
        completed_tasks: user.completed_tasks
    }),
    { ...userActions, ...tasksActions }
)(MyTasks);
