import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("tiny");
app.use(logger);
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
