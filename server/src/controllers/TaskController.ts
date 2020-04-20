import express from "express";

import { TaskModel, UserModel } from "../models";
import { ITask } from "../models/Task";

class TaskController {
    showAll = (req: express.Request, res: express.Response) => {
        TaskModel.find()
            .sort({ createdAt: -1 })
            .populate("owner", "fullname")
            .exec((err, tasks: ITask[]) => {
                if (err) {
                    return res.json(err);
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
            language: req.body.language
        };
        const Task = new TaskModel(postData);
        Task.save()
            .then((obj: any) => {
                const updateData: any = { $push: { tasks: obj._id } };
                if (req.body.code) {
                    updateData.$push.completed_tasks = {
                        task: obj._id,
                        solution: req.body.code
                    };
                }

                UserModel.findByIdAndUpdate(
                    userId,
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

    addSolution(req: any, res: express.Response) {
        const userId: string = req.user._id;
        const updateData: any = {
            task: req.params.id,
            solution: req.body.solution
        };

        UserModel.findByIdAndUpdate(
            userId,
            { $push: { completed_tasks: updateData } },
            { new: true }
        )
            .populate(
                "completed_tasks.task",
                "_id title description language createdAt"
            )
            .exec((err, user) => {
                if (err || !user) {
                    return res.status(404).json(err);
                }

                res.status(200).json(user.completed_tasks);
            });
    }
}

export default TaskController;
