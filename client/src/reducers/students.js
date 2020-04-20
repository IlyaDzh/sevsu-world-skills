const initialState = {
    items: null,
    currentItem: null,
    error: false,
    isLoading: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "STUDENTS:SET_ITEMS":
            return {
                ...state,
                items: payload,
                isLoading: false
            };
        case "STUDENTS:SET_CURRENT_ITEM":
            return {
                ...state,
                currentItem: payload,
                isLoading: false
            };
        case "STUDENTS:SET_ERROR":
            return {
                ...state,
                error: payload
            };
        case "STUDENTS:SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    }
};
