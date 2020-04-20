import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input } from "antd";

import { Modal } from "components";
import { userActions } from "actions";
import { validateField } from "utils/helpers";

const ModalAddSolution = ({
    visible,
    setVisible,
    task_id,
    addTaskSolution,
    fetchUserData
}) => (
    <Formik
        enableReinitialize={true}
        initialValues={{
            solution: ""
        }}
        validationSchema={Yup.object({
            solution: Yup.string().required("Заполните поле")
        })}
        onSubmit={(values, { setSubmitting }) => {
            addTaskSolution(task_id, values)
                .then(() => {
                    setVisible(false);
                    fetchUserData();
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
                title="Добавление решения"
                visible={visible}
                setVisible={setVisible}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                okText="Добавить"
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item
                        validateStatus={validateField("solution", touched, errors)}
                        help={!touched.solution ? null : errors.solution}
                        hasFeedback
                    >
                        <Input.TextArea
                            name="solution"
                            autoSize={{ minRows: 5, maxRows: 14 }}
                            placeholder="Вставьте код, чтобы решить задачу"
                            value={values.solution}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )}
    </Formik>
);

export default connect(null, userActions)(ModalAddSolution);
