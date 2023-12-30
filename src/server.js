import express from "express";

const PORT = 4000;

const app = express();

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.get("/", (req, res) => {
  res.send("I still love you");
});

app.listen(PORT, handleListening);
