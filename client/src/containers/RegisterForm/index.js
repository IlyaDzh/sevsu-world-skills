import { withFormik } from "formik";

import { RegisterForm as BaseRegisterForm } from "components";
import validationSchema from "utils/validationSchema";

const RegisterForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password_2: ""
    }),
    validationSchema,
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }
})(BaseRegisterForm);

export default RegisterForm;
