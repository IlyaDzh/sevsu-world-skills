import React from "react";
import { Form, Input } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

import { Button } from "components";
import { validateField } from "utils/helpers";
import "./Profile.scss";

const Profile = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
}) => (
    <Form onSubmit={handleSubmit} className="profile-form">
        <Form.Item>
            <Input
                name="email"
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                size="large"
                value={values.email}
                disabled
            />
        </Form.Item>
        <Form.Item
            validateStatus={validateField("fullname", touched, errors)}
            help={!touched.fullname ? null : errors.fullname}
            hasFeedback
        >
            <Input
                name="fullname"
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                size="large"
                placeholder="Ваше имя и фамилия"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
        <Form.Item
            validateStatus={validateField("password", touched, errors)}
            help={!touched.password ? null : errors.password}
            hasFeedback
        >
            <Input
                name="password"
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                size="large"
                type="password"
                placeholder="Пожалуйста, введите новый пароль"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
        <Form.Item
            className="profile-form__textarea"
            validateStatus={validateField("info", touched, errors)}
            help={!touched.info ? null : errors.info}
            hasFeedback
        >
            <Input.TextArea
                name="info"
                rows={3}
                placeholder="Информация о себе"
                value={values.info}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
        <Form.Item>
            <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                type="primary"
                size="large"
            >
                Применить
            </Button>
        </Form.Item>
    </Form>
);

export default Profile;
