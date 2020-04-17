import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    owner: string;
    title: string;
    description: string;
    code: string;
    language: string;
}

const TaskSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: "Owner is required"
        },
        title: {
            type: String,
            required: "Title is required!"
        },
        description: {
            type: String,
            required: "Description is required!"
        },
        code: String,
        language: {
            type: String,
            required: "Language is required!"
        }
    },
    {
        timestamps: true
    }
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
