const fakeUser = {
  username: "tomas",
  loggedIn: true,
}

export const trending = (req, res) => res.render("home", { pageTitle: "Home", fakeUser });
export const see = (req, res) => res.render("watch", {pageTitle: "watch"});
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit", {pageTitle: "edit"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
