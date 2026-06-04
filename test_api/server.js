import express from "express";
import userRouter from "./routes/auth.route.js";

const app = express();

const PORT = 3000;

app.use("/auth", userRouter);

app.listen(PORT, () => console.log(`http://localhost:3000`));
