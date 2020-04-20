import { withFormik } from "formik";
import * as Yup from "yup";

import BaseLoginForm from "../components/LoginForm";
import { userActions } from "actions";
import store from "store";

const LoginForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validationSchema: Yup.object({
        email: Yup.string().email("Неверный E-mail").required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле")
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserSignIn(values))
            .then(({ status }) => {
                if (status === "Success") {
                    setSubmitting(true);
                    props.history.push("/");
                }
            })
            .catch(() => {
                setSubmitting(false);
            });
    }
})(BaseLoginForm);

export default LoginForm;
