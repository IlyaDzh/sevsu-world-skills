import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Select } from "antd";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";

import { Modal } from "components";
import { userActions, tasksActions } from "actions";
import { validateField } from "utils/helpers";

const ModalAddTask = ({
    visible,
    setVisible,
    addUserTask,
    fetchUserData,
    fetchTasks
}) => (
    <Formik
        enableReinitialize={true}
        initialValues={{
            title: "",
            language: "",
            description: "",
            code: ""
        }}
        validationSchema={Yup.object({
            title: Yup.string().required("Название задачи обязательно"),
            language: Yup.string().required("Язык задачи обязателен"),
            description: Yup.string().required("Описание задачи обязательно")
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            addUserTask(values)
                .then(() => {
                    setVisible(false);
                    resetForm();
                    fetchUserData();
                    fetchTasks();
                })
                .catch(() => {
                    setSubmitting(false);
                });
        }}
    >
        {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue
        }) => (
            <Modal
                title="Добавление новой задачи"
                visible={visible}
                setVisible={setVisible}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                okText="Создать"
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item
                        validateStatus={validateField("title", touched, errors)}
                        help={!touched.title ? null : errors.title}
                        hasFeedback
                    >
                        <Input
                            name="title"
                            prefix={
                                <EditOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                            }
                            placeholder="Название задачи"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("language", touched, errors)}
                        help={!touched.language ? null : errors.language}
                        hasFeedback
                    >
                        <Select
                            name="language"
                            placeholder="Выберите язык программирования"
                            onChange={value => setFieldValue("language", value)}
                            onBlur={() => setFieldTouched("language", true)}
                        >
                            <Select.Option value="js">Java Script</Select.Option>
                            <Select.Option value="ts">Type Script</Select.Option>
                            <Select.Option value="php">PHP</Select.Option>
                            <Select.Option value="c++">C++</Select.Option>
                            <Select.Option value="c-sharp">C#</Select.Option>
                            <Select.Option value="go">Go</Select.Option>
                            <Select.Option value="python">Python</Select.Option>
                            <Select.Option value="ruby">Ruby</Select.Option>
                            <Select.Option value="java">Java</Select.Option>
                            <Select.Option value="kotlin">Kotlin</Select.Option>
                            <Select.Option value="css">CSS</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField(
                            "description",
                            touched,
                            errors
                        )}
                        help={!touched.description ? null : errors.description}
                        hasFeedback
                    >
                        <Input
                            name="description"
                            prefix={
                                <InfoOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                            }
                            placeholder="Описание задачи"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input.TextArea
                            name="code"
                            autoSize={{ minRows: 4, maxRows: 8 }}
                            placeholder="Вставьте код, чтобы решить задачу"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )}
    </Formik>
);

export default connect(null, { ...userActions, ...tasksActions })(ModalAddTask);
