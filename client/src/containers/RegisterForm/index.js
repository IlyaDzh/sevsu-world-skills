import { withFormik } from "formik";
import * as Yup from "yup";

import { RegisterForm as BaseRegisterForm } from "components";

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
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }
})(BaseRegisterForm);

export default RegisterForm;
