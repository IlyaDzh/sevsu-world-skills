import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { userActions } from "actions";
import { Button, CardTask } from "components";
import { ModalAddTask } from "containers";

const MyTasks = ({ fetchUserData, tasks }) => {
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
                        <CardTask key={item._id} {...item} performed={true} />
                        // TODO:
                        // таск должен содержать массив id, которые выполнили задание
                        // performed={item.performed.include(data._id)}
                        // добавить футер для удаления карточкb если это наша задача
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
        tasks: user.tasks
    }),
    userActions
)(MyTasks);
