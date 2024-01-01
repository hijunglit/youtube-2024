import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("tiny");
app.use(logger);
const globalRouter = express.Router();
const videoRouter = express.Router();
const userRouter = express.Router();

const handleHome = (req, res) => res.send("this is home");

globalRouter.get("/", handleHome);

const handleEditUser = (req, res) => res.send("edit user");
userRouter.get("/edit", handleEditUser);

const handleWatchVideo = (req, res) => res.send("watch video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
