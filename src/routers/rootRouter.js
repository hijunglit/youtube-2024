import express from "express";
import { home, search } from "../controllers/videoControllers";
import { publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userControllers";

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
