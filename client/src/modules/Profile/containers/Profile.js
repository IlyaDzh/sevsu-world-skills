import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

import BaseProfile from "../components/Profile";
import { userActions, studentsActions } from "actions";
import store from "store";

const Profile = ({ fetchUserData, fetchUserSignOut, data }) => {
    useEffect(() => {
        if (!data) {
            fetchUserData();
        }
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSignOut = () => {
        fetchUserSignOut();
    };

    return data && <ProfileEnhancer data={data} handleSignOut={handleSignOut} />;
};

const ProfileEnhancer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ data: { email, fullname, info } }) => ({
        email: email,
        fullname: fullname,
        password: "",
        info: info
    }),
    validationSchema: Yup.object({
        fullname: Yup.string().required("Укажите свое имя и фамилию"),
        password: Yup.string()
            .min(8, "Пароль слишком маленький")
            .max(15, "Пароль слишком большой"),
        info: Yup.string().max(300, "Слишком много информации")
    }),
    handleSubmit: (values, { setSubmitting }) => {
        store
            .dispatch(userActions.updateUserData(values))
            .then(() => {
                store.dispatch(studentsActions.fetchStudents());
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    }
})(BaseProfile);

export default connect(
    ({ user }) => ({
        data: user.data
    }),
    userActions
)(Profile);
