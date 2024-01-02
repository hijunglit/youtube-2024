const fakeUser = {
  username: "tomas",
  loggedIn: false,
}
const videos = [
  {
    title: "1",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 1,
    id: 1,
  },
  {
    title: "2",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 1,
    id: 2,
  },
  {
    title: "3",
    rating: "5.0",
    comments: "great",
    createdAt: "2024.1.2",
    views: 1,
    id: 3,
  },
];
// const videos = null;

export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = videos[id-1];
  res.render("watch", {pageTitle: `watching ${video.title}`, fakeUser});
};
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit", {pageTitle: "edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
