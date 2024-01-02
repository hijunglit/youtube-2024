export const trending = (req, res) => {
  const fakeUser = {
    username: "tomas",
    loggedIn: false,
  }
  const videos = [
    {
      title: "title",
      rating: "5.0",
      comments: "great",
      createdAt: "2024.1.2",
      views: 1,
    }
  ];
  // const videos = null;
  res.render("home", { pageTitle: "Home", fakeUser, videos })
};
export const see = (req, res) => res.render("watch", {pageTitle: "watch"});
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit", {pageTitle: "edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
