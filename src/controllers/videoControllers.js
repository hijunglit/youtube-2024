
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
  const video = videos[id-1];
  console.log(video);
  res.render("watch", {pageTitle: `watching ${video.title}`, video});
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id-1];
  res.render("edit", {pageTitle: `editing ${video.title}`, video});
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const video = [id-1];
  const { title } = req.body;
  console.log(req.body);
  video.title = title;
  res.redirect(`/video/${id}`);
};
