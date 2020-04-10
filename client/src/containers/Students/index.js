import React from "react";
import { Row } from "antd";

import { CardStudent } from "components";

const Students = () => {
    return (
        <Row>
            <CardStudent
                _id="1"
                fullname="Илья Долженко"
                info="https://github.com/ilyadzh"
            />
            <CardStudent
                _id="2"
                fullname="Максим Иванов"
                info="https://github.com/maksim-ivanov"
            />
            <CardStudent _id="3" fullname="Юрий Волобуев" />
            <CardStudent
                _id="4"
                fullname="Дмитрий Ларин"
                info="Мой ютуб канал: https://www.youtube.com/user/larinshow"
            />
        </Row>
    );
};

export default Students;
