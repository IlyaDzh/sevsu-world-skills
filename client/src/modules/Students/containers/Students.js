import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Empty, Spin } from "antd";

import { studentsActions } from "actions";
import { CardStudent, Error } from "components";

const Students = ({ fetchStudents, students, error, isLoading }) => {
    useEffect(() => {
        if (!students) {
            fetchStudents();
        }
    }, [students]); // eslint-disable-line react-hooks/exhaustive-deps

    return isLoading ? (
        <Spin size="large" />
    ) : error ? (
        <Error status={404} title={404} />
    ) : students && students.length ? (
        <Row>
            {students.map(item => (
                <CardStudent key={item._id} {...item} />
            ))}
        </Row>
    ) : (
        <Empty style={{ margin: "0 auto" }} description="Нет студентов" />
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
