const initialState = {
    data: null,
    error: false,
    isLoading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
            return {
                ...state,
                data: payload,
                isLoading: false
            };
        case "USER:SET_ERROR":
            return {
                ...state,
                error: payload
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
