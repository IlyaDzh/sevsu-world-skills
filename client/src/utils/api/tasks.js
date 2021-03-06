import { axios } from "core";

export default {
    getTasks: () => axios.get("/task/all"),
    getCurrentTask: id => axios.get("/task/" + id),
    addTask: data => axios.post("/task/create", data),
    addSolution: (id, data) => axios.put("/task/" + id, data),
    deleteTask: id => axios.delete("/task/" + id)
};
