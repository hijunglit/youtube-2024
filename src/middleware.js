import multer from "multer";
import flash from "express-flash";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Youtube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    console.log(req);
    req.flash("info", "not logged in");
    return res.redirect("/login");
  }
};
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatar",
  limits: {
    fileSize: 1000000,
  },
});
export const uploadVideo = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 6000000,
  },
});
