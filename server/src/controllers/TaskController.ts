import express from "express";

import { TaskModel, UserModel } from "../models";
import { ITask } from "../models/Task";

class TaskController {
    showAll = (req: express.Request, res: express.Response) => {
        TaskModel.find()
            .sort({ createdAt: -1 })
            .populate("owner", "fullname")
            .exec((err, tasks: ITask[]) => {
                if (err || !tasks.length) {
                    return res.status(404).json({
                        message: "Tasks not found"
                    });
                }
                res.status(200).json(tasks);
            });
    };

    showById = (req: express.Request, res: express.Response) => {
        const id: string = req.params.id;
        TaskModel.findById(id)
            .populate("owner", "fullname")
            .exec((err, task: ITask) => {
                if (err) {
                    return res.status(404).json({ message: "Task not found" });
                }
                res.status(200).json(task);
            });
    };

    create(req: any, res: express.Response) {
        const userId: string = req.user._id;
        const postData = {
            owner: userId,
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            language: req.body.language
        };
        const Task = new TaskModel(postData);
        Task.save()
            .then((obj: any) => {
                const updateData: any = { $push: { tasks: obj._id } };
                if (postData.code) {
                    updateData.$push.completed_tasks = {
                        task: obj._id,
                        solution: postData.code
                    };
                }

                UserModel.findOneAndUpdate(
                    { _id: postData.owner },
                    updateData,
                    { upsert: true },
                    err => {
                        if (err) {
                            return res.status(500).json({ message: err });
                        }
                    }
                );

                res.status(200).json(obj);
            })
            .catch(reason => {
                res.status(500).json({ message: reason.message });
            });
    }

    update(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        const postData = {
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            language: req.body.language
        };
        TaskModel.findByIdAndUpdate(id, { $set: postData }, { new: true })
            .populate("owner", "fullname")
            .exec((err, task) => {
                if (err) {
                    return res.status(404).json({ message: "Task not found" });
                }

                res.status(200).json(task);
            });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        TaskModel.findByIdAndRemove(id)
            .then(task => {
                if (task) {
                    UserModel.findOneAndUpdate(
                        { _id: task.owner },
                        { $pull: { tasks: id, completed_tasks: { task: id } } },
                        { upsert: true },
                        err => {
                            if (err) {
                                return res.status(500).json({ message: err });
                            }
                        }
                    );

                    res.status(200).json({
                        message: `Task '${task.title}' deleted`
                    });
                }
            })
            .catch(() => {
                res.status(404).json({ message: `News not found` });
            });
    }
}

export default TaskController;
