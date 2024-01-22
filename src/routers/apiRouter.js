import express from "express";
import { registerView } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24}})/view", registerView);

export default apiRouter;
