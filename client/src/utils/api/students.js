import { axios } from "core";

export default {
    getStudents: () => axios.get("/user/all"),
    getCurrentStudent: id => axios.get("/user/" + id)
};
