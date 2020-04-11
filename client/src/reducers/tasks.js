const initialState = {
    items: [],
    currentItem: null,
    error: false,
    isLoading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "TASKS:SET_ITEMS":
            return {
                ...state,
                items: payload,
                isLoading: false
            };
        case "TASKS:SET_CURRENT_ITEM":
            return {
                ...state,
                currentItem: payload,
                isLoading: false
            };
        case "TASKS:SET_ERROR":
            return {
                ...state,
                error: payload
            };
        case "TASKS:SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    }
};
