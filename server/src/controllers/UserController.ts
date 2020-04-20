import express from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../models";
import { IUser } from "../models/User";
import { createJWTToken, checkOnNull } from "../utils";

class UserController {
    showAll = (req: express.Request, res: express.Response) => {
        UserModel.find()
            .sort({ createdAt: -1 })
            .exec((err, users: IUser[]) => {
                if (err || !users.length) {
                    return res.status(404).json({
                        message: "Users not found"
                    });
                }
                res.status(200).json(users);
            });
    };

    showById = (req: express.Request, res: express.Response) => {
        const id: string = req.params.id;
        UserModel.findById(id, "_id fullname email info tasks")
            .populate({ path: "tasks", options: { sort: { createdAt: -1 } } })
            .exec((err, user: IUser) => {
                if (err) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            });
    };

    getMe = (req: any, res: express.Response) => {
        const userId: string = req.user._id;
        UserModel.findById(userId)
            .populate({
                path: "tasks",
                options: { sort: { createdAt: -1 } }
            })
            .populate(
                "completed_tasks.task",
                "_id title description language createdAt"
            )
            .exec((err, user: IUser) => {
                if (err || !user) {
                    return res.status(404).json({
                        message: err
                    });
                }

                res.status(200).json(user);
            });
    };

    create(req: express.Request, res: express.Response) {
        const postData: any = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        };
        const user = new UserModel(postData);
        user.save()
            .then((obj: any) => {
                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }

    login(req: express.Request, res: express.Response) {
        const postData: any = {
            email: req.body.email,
            password: req.body.password
        };

        UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token: string = createJWTToken(user);
                res.status(200).json({
                    status: "Success",
                    token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password or email"
                });
            }
        });
    }

    update(req: any, res: express.Response) {
        const userId: string = req.user._id;
        const postData: any = {
            fullname: req.body.fullname,
            password: req.body.password
        };
        checkOnNull(postData);
        postData.info = req.body.info;

        UserModel.findByIdAndUpdate(userId, { $set: postData }, { new: true })
            .populate({
                path: "tasks",
                options: { sort: { createdAt: -1 } }
            })
            .populate(
                "completed_tasks.task",
                "_id title description language createdAt"
            )
            .exec((err, user) => {
                if (err) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json(user);
            });
    }
}

export default UserController;
