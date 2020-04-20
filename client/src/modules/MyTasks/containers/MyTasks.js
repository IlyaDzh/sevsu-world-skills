import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Empty } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { userActions, tasksActions } from "actions";
import { Button, CardTask } from "components";
import { ModalAddTask } from "containers";
import { modalConfirm } from "utils/helpers";

const MyTasks = ({
    deleteTask,
    fetchTasks,
    fetchUserData,
    tasks,
    completed_tasks
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!tasks) {
            fetchUserData();
        }
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = id => {
        modalConfirm({
            title: "Вы точно хотите удалить задачу?",
            icon: <ExclamationCircleOutlined />,
            okText: "Удалить",
            okType: "danger",
            onOk: () => {
                deleteTask(id).then(() => {
                    fetchUserData();
                    fetchTasks();
                });
            }
        });
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
