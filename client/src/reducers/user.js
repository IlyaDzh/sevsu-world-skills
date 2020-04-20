const initialState = {
    data: null,
    completed_tasks: null,
    tasks: null,
    isAuth: window.localStorage.token ? true : false,
    isLoading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
            const { tasks, completed_tasks, ...info } = payload;
            return {
                ...state,
                data: info,
                completed_tasks: completed_tasks,
                tasks: tasks,
                isAuth: true,
                isLoading: false
            };
        case "USER:SET_IS_AUTH":
            return {
                ...state,
                isAuth: payload
            };
        case "USER:SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    }
};
