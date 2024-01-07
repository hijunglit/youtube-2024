import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
};
export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", { pageTitle: `editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const video = [id - 1];
  const { title } = req.body;
  console.log(req.body);
  videos[id - 1].title = title;
  res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload video" });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  res.redirect("/");
};
