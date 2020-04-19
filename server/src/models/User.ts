import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { generatePasswordHash } from "../utils";

export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    info: string;
    tasks: Array<Object>;
    completed_tasks: Array<Object>;
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
        ],
        completed_tasks: [
            {
                task: {
                    type: Schema.Types.ObjectId,
                    ref: "Task"
                },
                solution: String
            }
        ]
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    const user: any = this;

    if (!user.isModified("password")) {
        return next();
    }

    user.password = await generatePasswordHash(user.password);
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    // @ts-ignore
    const user: any = this._update;

    if (!user.$set.password) {
        return next();
    }

    user.$set.password = await generatePasswordHash(user.$set.password);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
