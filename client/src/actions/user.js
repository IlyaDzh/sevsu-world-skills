import { userApi } from "utils/api";

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setError: bool => ({
        type: "USER:SET_ERROR",
        payload: bool
    }),
    setIsLoading: bool => ({
        type: "USER:SET_IS_LOADING",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        dispatch(actions.setIsLoading(true));
        userApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setError(true));
            });
    },
    updateUserData: () => dispatch => {
        userApi
            .updateMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data));
            })
            .catch(() => {
                dispatch(actions.setError(true));
            });
    }
};

export default actions;
