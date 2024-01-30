import express from "express";
import { registerView, registerComment, deleteComment } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", registerComment);
apiRouter.delete("/comments/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
