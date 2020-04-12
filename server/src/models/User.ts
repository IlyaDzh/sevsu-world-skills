import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { generatePasswordHash } from "../utils";

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

UserSchema.pre("save", async function (next) {
    const user: any = this;

    if (!user.isModified("password")) {
        return next();
    }

    user.password = await generatePasswordHash(user.password);
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
