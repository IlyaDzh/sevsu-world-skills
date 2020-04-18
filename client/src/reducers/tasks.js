const initialState = {
    items: [],
    currentItem: null,
    error: false
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
        default:
            return state;
    }
};
