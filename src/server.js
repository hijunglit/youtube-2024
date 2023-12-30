import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = morgan("tiny");

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(logger);

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.get("/", handleHome);

app.listen(PORT, handleListening);
