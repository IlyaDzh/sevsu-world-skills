import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/sevsu-world-skills", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});