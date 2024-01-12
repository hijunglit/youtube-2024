import User from "../models/User";
import fetch from 'node-fetch';
import bcrypt from "bcrypt";

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
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) {
    return res.status(400).render("login", {
      pageTitle, 
      errorMessage: "wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
}
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const requestToken = await(
      await fetch(finalUrl, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
        },
      }
    )).json();
    if("access_token" in requestToken) {
      const { access_token } = requestToken;
      const apiUrl = "https://api.github.com";
      const userData = await(
        await fetch(`${apiUrl}/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      console.log("user data : ",userData);
      const emailData = await(
        await fetch(`${apiUrl}/user/emails`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const emailObj = emailData.find((data) => 
        data.primary === true && data.verified === true
        );
      if(!emailObj) {
        return res.redirect("/login");
      } 
      const existUser = await User.findOne({email: emailObj.email});
      console.log("exist user: ", existUser);
      if(existUser) {
        req.session.loggedIn = true;
        req.session.user = existUser.email;
        return res.redirect("/");
      } else {
        await User.create({
          name: emailObj.email,
          email: emailObj.email,
          username: emailObj.email,
          socialOnly: true,
          password: "",
        })
        req.session.loggedIn = true;
        req.session.user = emailObj.email;
        return res.redirect("/");
      }
    } else {
      return res.redirect("/login");
    }
  }
export const edit = (req, res) => res.send("edit");
export const remove = (req, res) => res.send("remote user");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
