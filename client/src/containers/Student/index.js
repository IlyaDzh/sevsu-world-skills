import React from "react";

import { Student as BaseStudent } from "components";

const Student = () => {
    return (
        <div>
            <BaseStudent
                email="ilay00@mail.ru"
                fullname="Илья Долженко"
                info="Мой GitHub: https://github.com/ilyadzh, ВКонтакте: https://vk.com/id43336530"
                tasks={[
                    {
                        _id: "234hgf923mfg3l",
                        language: "js",
                        title: "ReactCode",
                        description: "Сделать приложение для хранения кода студентов"
                    },
                    {
                        _id: "234hgf23mfg3l",
                        language: "js",
                        title: "ReactCode",
                        description: "Сделать приложение для хранения кода студентов"
                    }
                ]}
            />
        </div>
    );
};

export default Student;
