import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { studentsActions } from "actions";
import { Student as BaseStudent } from "components";

const Student = ({ fetchCurrentStudent, student, error, isLoading }) => {
    const { id } = useParams();

    useEffect(() => {
        fetchCurrentStudent(id);
    }, [id]);

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
        student && <BaseStudent {...student} />
    );
};

export default connect(
    ({ students }) => ({
        student: students.currentItem,
        error: students.error,
        isLoading: students.isLoading
    }),
    studentsActions
)(Student);
