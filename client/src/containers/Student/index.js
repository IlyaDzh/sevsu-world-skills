import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { studentsActions, userActions } from "actions";
import { Student as BaseStudent } from "components";

const Student = ({
    fetchCurrentStudent,
    fetchUserData,
    student,
    completed_tasks,
    error,
    isLoading
}) => {
    const { id } = useParams();

    useEffect(() => {
        if (!completed_tasks.length) {
            fetchUserData();
        }
    }, [completed_tasks]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchCurrentStudent(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
        student && <BaseStudent completed_tasks={completed_tasks} {...student} />
    );
};

export default connect(
    ({ students, user }) => ({
        student: students.currentItem,
        completed_tasks: user.completed_tasks,
        error: students.error,
        isLoading: students.isLoading
    }),
    {
        ...studentsActions,
        ...userActions
    }
)(Student);
