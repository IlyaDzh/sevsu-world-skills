import { userApi } from "utils/api";
import { openNotification } from "utils/helpers";

const actions = {
    setData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setCompletedTasks: tasks => ({
        type: "USER:SET_COMPLETED_TASKS",
        payload: tasks
    }),
    setTasks: tasks => ({
        type: "USER:SET_TASKS",
        payload: tasks
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    addUserTask: postData => () => {
        return userApi
            .addTask(postData)
            .then(({ data }) => {
                openNotification({
                    title: "Отлично",
                    text: "Ваша задача была добавлена!",
                    type: "success"
                });
                return data;
            })
            .catch(err => {
                openNotification({
                    title: "Ошибка",
                    text: "Упс. Попробуйте позже.",
                    type: "error"
                });
            });
    },
    fetchUserData: () => dispatch => {
        userApi
            .getMe()
            .then(({ data: { tasks, completed_tasks, ...info } }) => {
                dispatch(actions.setData(info));
                dispatch(actions.setCompletedTasks(completed_tasks));
                dispatch(actions.setTasks(tasks));
            })
            .catch(err => {
                dispatch(actions.setIsAuth(false));
                delete window.localStorage.token;
            });
    },
    updateUserData: () => dispatch => {
        userApi
            .updateMe()
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
            .catch(err => {
                openNotification({
                    title: "Ошибка при авторизации",
                    text: "Неверный логин или пароль!",
                    type: "error"
                });
            });
    }
};

export default actions;
