import { combineReducers } from "redux";

import user from "./user";
import tasks from "./tasks";
import students from "./students";

export default combineReducers({
    user,
    tasks,
    students
});
