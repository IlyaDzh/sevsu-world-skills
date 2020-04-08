import { withFormik } from "formik";

import { LoginForm as BaseLoginForm } from "components";
import validationSchema from "utils/validationSchema";

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
