import { userApi } from "utils/api";
import { openNotification } from "utils/helpers";

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        userApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data));
            })
            .catch(err => {
                if (err.response.status === 403) {
                    dispatch(actions.setIsAuth(false));
                    delete window.localStorage.token;
                }
            });
    },
    updateUserData: () => dispatch => {
        userApi
            .updateMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data));
            })
            .catch(() => {});
    },
    fetchUserSignIn: postData => dispatch => {
        return userApi
            .signIn(postData)
            .then(({ data }) => {
                const { token } = data;
                openNotification({
                    title: "Отлично!",
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
                    text: "Неверный логин или пароль",
                    type: "error"
                });
            });
    }
};

export default actions;
