import express from "express";
import dotenv from "dotenv";

dotenv.config();

import "./core/db";
import createRoutes from "./core/routes";

const app = express();

createRoutes(app);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});