import { axios } from "core";

export default {
    getTasks: () => axios.get("/task/all"),
    getCurrentTask: id => axios.get("/task/" + id)
};
