import React from "react";
import { Row } from "antd";

import { CardTask } from "components";

const Tasks = () => {
    return (
        <Row>
            <CardTask
                _id="1"
                language="js"
                title="Палиндром"
                description="Дана строка; нужно написать функцию, которая позволяет
                        вернуть значение true, если строка является палиндромом, и
                        false — если нет. При этом нужно учитывать пробелы и знаки
                        препинания."
            />
            <CardTask
                _id="2"
                language="c++"
                title="FizzBuzz"
                description="Требуется написать функцию, выводящую в консоль числа от 1 до
                        n, где n — это целое число, которая функция принимает в
                        качестве параметра, с такими условиями: вывод fizz вместо
                        чисел, кратных 3; вывод buzz вместо чисел, кратных 5; вывод
                        fizzbuzz вместо чисел, кратных как 3, так и 5"
            />
            <CardTask
                _id="3"
                language="ts"
                title="Анаграмма"
                description="Нужно написать функцию, которая проверяет, являются ли две
                        строки анаграммами, причем регистр букв не имеет значения.
                        Учитываются лишь символы; пробелы или знаки препинания в
                        расчет не берутся."
            />
            <CardTask
                _id="4"
                language="ruby"
                title="Поиск гласных"
                description="Нужно написать функцию, принимающую строку в качестве
                        аргумента и возвращающую количество гласных, которые
                        содержатся в строке. Гласными являются «a», «e», «i», «o»,
                        «u»."
            />
            <CardTask
                _id="5"
                language="php"
                title="Фибоначчи"
                description="Нужно написать функцию, которая возвращает n-ную запись в
                        определенной последовательности чисел Фибоначчи, причем n —
                        число, которое передается в качестве аргумента функции."
            />
        </Row>
    );
};

export default Tasks;
