import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Modal, Form, Input, Button } from "antd";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";

import { userActions } from "actions";
import { validateField } from "utils/helpers";

const ModalAddTask = ({ visible, setVisible, addUserTask }) => (
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
            isSubmitting
        }) => (
            <Modal
                title="Добавление новой задачи"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Назад
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={isSubmitting}
                        onClick={() => handleSubmit()}
                    >
                        Создать
                    </Button>
                ]}
                centered
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
                        <Input
                            name="language"
                            prefix={
                                <EditOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                            }
                            placeholder="Язык"
                            value={values.language}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
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
                            rows={4}
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

export default connect(null, userActions)(ModalAddTask);
