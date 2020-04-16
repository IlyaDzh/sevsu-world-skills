import { axios } from "core";

export default {
    getTasks: () => axios.get("/task/all"),
    getCurrentTask: id => axios.get("/task/" + id),
    createTask: data => axios.post("/task/create", data)
};
