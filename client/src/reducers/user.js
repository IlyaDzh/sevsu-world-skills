const initialState = {
    data: null,
    completed_tasks: [],
    tasks: [],
    isAuth: window.localStorage.token ? true : false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
            return {
                ...state,
                data: payload,
                isAuth: true
            };
        case "USER:SET_COMPLETED_TASKS":
            return {
                ...state,
                completed_tasks: payload
            };
        case "USER:SET_TASKS":
            return {
                ...state,
                tasks: payload
            };
        case "USER:SET_IS_AUTH":
            return {
                ...state,
                isAuth: payload
            };
        default:
            return state;
    }
};
