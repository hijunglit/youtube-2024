import express from "express";
import {
  watch,
  getUpload,
  postUpload,
  deleteVideo,
  getEdit,
  postEdit,
} from "../controllers/videoControllers";
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;