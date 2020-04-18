import { studentsApi } from "utils/api";

const actions = {
    setStudents: items => ({
        type: "STUDENTS:SET_ITEMS",
        payload: items
    }),
    setCurrentStudent: item => ({
        type: "STUDENTS:SET_CURRENT_ITEM",
        payload: item
    }),
    setError: bool => ({
        type: "STUDENTS:SET_ERROR",
        payload: bool
    }),
    setIsLoading: bool => ({
        type: "STUDENTS:SET_IS_LOADING",
        payload: bool
    }),
    fetchStudents: () => dispatch => {
        dispatch(actions.setIsLoading(true));
        studentsApi
            .getStudents()
            .then(({ data }) => {
                dispatch(actions.setStudents(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setError(true));
            });
    },
    fetchCurrentStudent: id => dispatch => {
        dispatch(actions.setIsLoading(true));
        studentsApi
            .getCurrentStudent(id)
            .then(({ data }) => {
                dispatch(actions.setCurrentStudent(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setError(true));
            });
    }
};

export default actions;
