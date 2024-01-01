import express from "express";
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("this is home");
globalRouter.get("/", handleHome);

export default globalRouter;
