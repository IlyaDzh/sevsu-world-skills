import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    info: string;
    tasks: Array<Object>;
}

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: "Fullname is required"
        },
        email: {
            type: String,
            unique: true,
            required: "Email address is required!",
            validate: [isEmail, "Invalid email"]
        },
        password: {
            type: String,
            required: "Password is required"
        },
        info: String,
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
