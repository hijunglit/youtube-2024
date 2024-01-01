import express from "express";
import { watch } from "../controllers/userControllers";
const videoRouter = express.Router();
videoRouter.get("/watch", watch);

export default videoRouter;
