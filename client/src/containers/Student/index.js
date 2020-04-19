import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { studentsActions, userActions } from "actions";
import { Student as BaseStudent, Error } from "components";

const Student = ({
    fetchCurrentStudent,
    fetchUserData,
    setError,
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
        return () => setError(false);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <Error status={404} title={404} />
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
