import { axios } from "core";

export default {
    getMe: () => axios.get("/user/me"),
    signIn: data => axios.post("/user/signin", data),
    signUp: data => axios.post("/user/signup", data),
    updateMe: data => axios.put("/user/update", data)
};
