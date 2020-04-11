import { tasksApi } from "utils/api";

const actions = {
    setTasks: items => ({
        type: "TASKS:SET_ITEMS",
        payload: items
    }),
    setCurrentTask: item => ({
        type: "TASKS:SET_CURRENT_ITEM",
        payload: item
    }),
    setError: bool => ({
        type: "TASKS:SET_ERROR",
        payload: bool
    }),
    setIsLoading: bool => ({
        type: "TASKS:SET_IS_LOADING",
        payload: bool
    }),
    fetchTasks: () => dispatch => {
        dispatch(actions.setIsLoading(true));
        tasksApi
            .getTasks()
            .then(({ data }) => {
                dispatch(actions.setTasks(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setError(true));
            });
    },
    fetchCurrentTask: id => dispatch => {
        dispatch(actions.setIsLoading(true));
        tasksApi
            .getCurrentTask(id)
            .then(({ data }) => {
                dispatch(actions.setCurrentTask(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.setError(true));
            });
    }
};

export default actions;
