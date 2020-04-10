import { withFormik } from "formik";
import * as Yup from "yup";

import { LoginForm as BaseLoginForm } from "components";

const validationSchema = Yup.object({
    email: Yup.string().email("Неверный E-mail!").required("Обязательное поле"),
    password: Yup.string()
        .min(8, "Пароль слишком маленький")
        .max(15, "Пароль слишком большой")
        .required("Обязательное поле")
});

const LoginForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validationSchema,
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }
})(BaseLoginForm);

export default LoginForm;
