import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localMiddleware } from './middleware';

const app = express();
const logger = morgan("tiny");
app.use(logger);
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    })
);
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
});
app.use(localMiddleware);
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
