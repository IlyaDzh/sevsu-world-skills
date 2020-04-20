import { userApi, tasksApi } from "utils/api";
import { openNotification } from "utils/helpers";

const actions = {
    setData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    setIsLoading: bool => ({
        type: "USER:SET_IS_LOADING",
        payload: bool
    }),
    addUserTask: postData => () => {
        return tasksApi
            .addTask(postData)
            .then(({ data }) => {
                openNotification({
                    title: "Отлично",
                    text: "Ваша задача была добавлена!",
                    type: "success"
                });
                return data;
            })
            .catch(() => {
                openNotification({
                    title: "Ошибка",
                    text: "Упс. Попробуйте позже.",
                    type: "error"
                });
            });
    },
    addTaskSolution: (id, postData) => () => {
        return tasksApi
            .addSolution(id, postData)
            .then(() => {
                openNotification({
                    title: "Отлично",
                    text: "Ваше решение было добавлено!",
                    type: "success"
                });
            })
            .catch(() => {
                openNotification({
                    title: "Ошибка",
                    text: "Упс. Попробуйте позже.",
                    type: "error"
                });
            });
    },
    fetchUserData: () => dispatch => {
        dispatch(actions.setIsLoading(true));
        userApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setData(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setIsAuth(false));
                delete window.localStorage.token;
            });
    },
    updateUserData: postData => dispatch => {
        return userApi
            .updateMe(postData)
            .then(({ data }) => {
                dispatch(actions.setData(data));
                openNotification({
                    title: "Отлично",
                    text: "Ваши данные успешно обновлены!",
                    type: "success"
                });
            })
            .catch(() => {
                openNotification({
                    title: "Ошибка",
                    text: "Упс. Попробуйте позже.",
                    type: "error"
                });
            });
    },
    fetchUserSignUp: postData => () => {
        return userApi.signUp(postData);
    },
    fetchUserSignIn: postData => dispatch => {
        return userApi
            .signIn(postData)
            .then(({ data }) => {
                const { token } = data;
                openNotification({
                    title: "Отлично",
                    text: "Авторизация прошла успешно!",
                    type: "success"
                });
                window.axios.defaults.headers.common["token"] = token;
                window.localStorage["token"] = token;
                dispatch(actions.fetchUserData());
                dispatch(actions.setIsAuth(true));
                return data;
            })
            .catch(() => {
                openNotification({
                    title: "Ошибка при авторизации",
                    text: "Неверный логин или пароль!",
                    type: "error"
                });
            });
    },
    fetchUserSignOut: () => dispatch => {
        dispatch(actions.setIsAuth(false));
        delete window.localStorage.token;
        openNotification({
            title: "Отлично",
            text: "Вы вышли из системы!",
            type: "success"
        });
    }
};

export default actions;
