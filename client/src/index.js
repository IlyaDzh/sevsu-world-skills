import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "App";
import "styles/index.scss";

import store from "store";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// TODO:
// Решение задачи
// Сортировка пустого массива
// После удаления последней задачи не обновляется стейт
// Потестить ошибки с неверным адресом
// При входе делается два раза запрос
// Возможно добавить появляющуюся боковую панель или просто уменьшить ее размер
