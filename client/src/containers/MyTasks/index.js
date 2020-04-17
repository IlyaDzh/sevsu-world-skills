import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { userActions } from "actions";
import { Button, CardTask } from "components";
import { ModalAddTask } from "containers";

const MyTasks = ({ fetchUserData, tasks, completed_tasks }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!tasks.length) {
            fetchUserData();
        }
    }, [tasks]); // eslint-disable-line react-hooks/exhaustive-deps

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
                            {...item}
                        />
                    ))}
                </Row>
            ) : (
                <div>Загрузка...</div>
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
    userActions
)(MyTasks);
