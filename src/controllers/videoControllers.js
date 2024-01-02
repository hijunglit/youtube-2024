
const videos = [
  {
    title: "First video",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 59,
    id: 1,
  },
  {
    title: "Second video",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 1,
    id: 2,
  },
  {
    title: "Third video",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 1,
    id: 3,
  },
];
// const videos = null;

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = videos[id-1];
  console.log(video);
  res.render("watch", {pageTitle: `watching ${video.title}`, video});
};
export const edit = (req, res) => {
  res.render("edit", {pageTitle: "edit"})
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
