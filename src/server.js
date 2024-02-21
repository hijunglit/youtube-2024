import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localMiddleware } from "./middleware";

const app = express();
const logger = morgan("tiny");
app.use(logger);
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(localMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/videos", express.static("videos"));
app.use("/static", express.static("assets"));
app.use("/image", express.static("src/images"));
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

export default app;
