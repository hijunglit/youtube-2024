import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "email/username is already taken",
    });
  }
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "password comfirm does not match",
    });
  }
  await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remote user");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
