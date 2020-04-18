import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "App";
import "styles/index.scss";

import store from 'store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// TODO:
// Много ошибок с удалением и последующим рендером
// Подтверждение удаление задачи
// Регистрация (+ редирект на страницу входа после удачной регистрации)
// Кнопка выхода в профиле
// Решение задачи
// При входе делается два раза запрос
// Возможно добавить появляющуюся боковую панель или просто уменьшить ее размер