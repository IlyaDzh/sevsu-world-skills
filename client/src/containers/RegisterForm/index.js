import { withFormik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import { openNotification } from "utils/helpers";
import { RegisterForm as BaseRegisterForm } from "components";
import { userActions } from "actions";
import store from "store";

const RegisterForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password_2: ""
    }),
    validationSchema: Yup.object({
        email: Yup.string().email("Неверный E-mail!").required("Обязательное поле"),
        fullname: Yup.string().required("Укажите свое имя и фамилию"),
        password: Yup.string()
            .min(8, "Пароль слишком маленький")
            .max(15, "Пароль слишком большой")
            .required("Обязательное поле"),
        password_2: Yup.string()
            .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
            .required("Обязательное поле")
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserSignUp(values))
            .then(() => {
                setSubmitting(true);
                props.history.push("/signin");
                openNotification({
                    title: "Отлично",
                    text: "Вы зарегистрированы!",
                    type: "success"
                });
            })
            .catch(err => {
                if (
                    get(err, "response.data.message", "").indexOf("duplicate") >= 0
                ) {
                    openNotification({
                        title: "Ошибка при регистрации",
                        text: "Аккаунт с такой почтой уже существует!",
                        type: "error",
                        duration: 5
                    });
                } else {
                    openNotification({
                        title: "Ошибка",
                        text: "Возникла серверная ошибка при регистрации!",
                        type: "error",
                        duration: 5
                    });
                }
                setSubmitting(false);
            });
    }
})(BaseRegisterForm);

export default RegisterForm;
