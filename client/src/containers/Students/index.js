import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row } from "antd";

import { studentsActions } from "actions";
import { CardStudent } from "components";

const Students = ({ fetchStudents, students, error, isLoading }) => {
    useEffect(() => {
        if (!students.length) {
            fetchStudents();
        }
    }, [students]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <div>loading...</div>
    ) : error ? (
        <div>Ошибка</div>
    ) : (
        students.length && (
            <Row>
                {students.map(item => (
                    <CardStudent key={item._id} {...item} />
                ))}
            </Row>
        )
    );
};

export default connect(
    ({ students }) => ({
        students: students.items,
        error: students.error,
        isLoading: students.isLoading
    }),
    studentsActions
)(Students);
