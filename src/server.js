import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import videoRouter from "./router/videoRouter";
import userRouter from "./router/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("tiny");
app.use(logger);

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
