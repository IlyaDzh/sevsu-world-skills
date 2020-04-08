import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { Button, Block } from "components";
import { validateField } from "utils/helpers";

const LoginForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
}) => (
    <div className="auth__content">
        <div className="auth__top">
            <h2>Войти в аккаунт</h2>
            <p>Пожалуйста, войдите в свой аккаунт</p>
        </div>
        <Block>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item
                    validateStatus={validateField("email", touched, errors)}
                    help={!touched.email ? null : errors.email}
                    hasFeedback
                >
                    <Input
                        name="email"
                        prefix={
                            <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        size="large"
                        placeholder="E-Mail"
                        value={values.email}
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
                        prefix={
                            <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        size="large"
                        type="password"
                        placeholder="Пароль"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form.Item>
                <Form.Item>
                    {isSubmitting && !isValid && <span>Ошибка!</span>}
                    <Button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        type="primary"
                        size="large"
                    >
                        Войти в аккаунт
                    </Button>
                </Form.Item>
                <Link className="auth__register-link" to="/signup">
                    Зарегистрироваться
                </Link>
            </Form>
        </Block>
    </div>
);

export default LoginForm;
