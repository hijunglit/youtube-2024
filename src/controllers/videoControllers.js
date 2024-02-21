import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate("owner")
      .sort({ createdAt: "asc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const videos = await Video.find({}).populate("owner");
  const video = await Video.findById(id)
    .populate("owner")
    .populate({
      path: "comments",
      populate: {
        path: "owner",
        model: "User",
      },
    });
  console.log("video :", video);
  if (!video) {
    res.status(404).render("404", { pageTitle: "Video not found." });
  }
  res.render("videos/watch", { pageTitle: video.title, video, videos });
};
export const getEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", {
    pageTitle: `Editing ${video.title}`,
    video,
  });
};
export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    console.log("doesn't match owner and user.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("info", "change success");
  return res.status(200).redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  res.render("videos/upload", { pageTitle: "Upload video" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const { video, thumbnail } = req.files;
  console.log(video[0].location, thumbnail[0].location);
  try {
    const isFly = process.env.NODE_ENV === "production";
    const uploadVideo = await Video.create({
      fileUrl: isFly ? video[0].location : video[0].path,
      thumbUrl: isFly ? thumbnail[0].location : thumbnail[0].path,
      title,
      owner: _id,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    console.log("uploadVideo.id = ", uploadVideo.id);
    const user = await User.findById(_id);
    user.videos.push(uploadVideo.id);
    user.save();
    console.log(user);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.status(200).redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  return res.render("videos/search", { pageTitle: `Search`, videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const registerComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { text },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    console.log("Video not found");
    return sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video,
  });
  video.comments.push(comment._id);
  await video.save();
  console.log(video);
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;
  const comment = await Comment.findById(id);
  const video = await Video.findOne({ owner: user._id });
  console.log(comment);
  console.log(video);

  if (!comment) {
    console.log("comment not found.");
    return res.sendStatus(404);
  }
  if (String(comment.owner) !== String(user._id)) {
    console.log("Not authorized");
    return res.sendStatus(400);
  }
  console.log("you can delete this comment");
  await comment.deleteOne({});
  console.log("delete comment is success");
  return res.sendStatus(200).json();
};
