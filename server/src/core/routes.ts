import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { UserController, TaskController } from "../controllers";
import { checkAuth } from "../middlewares";

const createRoutes = (app: express.Express) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(checkAuth);

    const User = new UserController();
    const Task = new TaskController();

    app.get("/user/all", User.showAll);
    app.get("/user/me", User.getMe);
    app.get("/user/:id", User.showById);
    app.post("/user/signup", User.create);
    app.post("/user/signin", User.login);
    app.put("/user", User.update);

    app.get("/task/all", Task.showAll);
    app.get("/task/:id", Task.showById);
    app.post("/task/create", Task.create);
    app.put("/task/:id", Task.addSolution);
    app.delete("/task/:id", Task.delete);
};

export default createRoutes;
