import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "asc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    res.status(404).render("404", { pageTitle: "Video not found." });
  }
  res.render("videos/watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("videos/edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  res.render("videos/upload", { pageTitle: "Upload video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { path: fileUrl } = req.file;
  console.log("multer req.file is => ", req.file);
  try {
    await Video.create({
      fileUrl,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
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
  console.log("we can search: ", videos);
  return res.render("videos/search", { pageTitle: `Search`, videos });
};
