import { withFormik } from "formik";
import * as Yup from "yup";

import { Profile as BaseProfile } from "components";

const validationSchema = Yup.object({
    fullname: Yup.string().required("Укажите свое имя и фамилию"),
    password: Yup.string()
        .min(8, "Пароль слишком маленький")
        .max(15, "Пароль слишком большой"),
    info: Yup.string().max(300, "Слишком много информации")
});

const Profile = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "ilay00mail.ru",
        fullname: "Илья Долженко",
        password: "",
        info: ""
    }),
    validationSchema,
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }
})(BaseProfile);

export default Profile;
