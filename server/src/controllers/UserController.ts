import express from "express";

import { UserModel } from "../models";
import { IUser } from "../models/User";

class UserController {
    showAll = (req: express.Request, res: express.Response) => {
        UserModel.find({}, (err, users: IUser) => {
            if (err || !users) {
                return res.status(404).json({
                    message: "Users not found"
                });
            }
            res.status(200).json(users);
        });
    };

    showById = (req: express.Request, res: express.Response) => {
        const id: string = req.params.id;
        UserModel.findById(id)
            .populate("tasks")
            .exec((err, user: IUser) => {
                if (err) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            });
    };

    getMe = (req: any, res: express.Response) => {
        // const id: string = req.user && req.user._id;
        // UserModel.findById(id, (err, user: IUser) => {
        //     if (err || !user) {
        //         return res.status(404).json({
        //             message: "User not found"
        //         });
        //     }
        //     res.status(200).json(user);
        // });
    };

    create(req: express.Request, res: express.Response) {
        const postData = {
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
        const postData = {
            email: req.body.email,
            password: req.body.password
        };

        UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            if (user.password === postData.password) {
                res.status(200).json({
                    message: "You are logged in"
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password or email"
                });
            }
        });
    }
}

export default UserController;
