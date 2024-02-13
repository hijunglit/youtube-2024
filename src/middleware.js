import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const isFly = process.env.NODE_ENV === "production";

const s3AvatarUploader = multerS3({
  s3: s3,
  bucket: "youtube-2024/image",
  acl: "public-read",
});
const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "youtube-2024/video",
  acl: "public-read",
});

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Youtube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isFly = isFly;
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "not logged in");
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
  storage: isFly ? s3AvatarUploader : undefined,
});
export const uploadVideo = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 6000000,
  },
  storage: isFly ? s3VideoUploader : undefined,
});
