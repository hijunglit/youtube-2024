import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "email/username is already taken",
    });
  }
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "password comfirm does not match",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const getLogin = () => res.render("login", { pageTitle: "Login" });
export const postLogin = async () => {
  const { username, password } = req.body;
  const exists = await User.exists({ username });
  if (!exists) {
    return res.status(400).render("join", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists",
    });
  }
  res.end();
};
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remote user");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
