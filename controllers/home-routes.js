//require modules
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

//establish routes
router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbData) => {
      const userPosts = dbData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts: userPosts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get routes
router.get("/dashboard", withAuth, (req, res) => {
  // console.log(req.session);
  User.findByPk(req.session.user_id, {
    include: [Post],
  })
    .then((dbData) => {
      // console.log(dbData);
      const user = dbData.get({ plain: true });
      console.log(user);
      res.render("dashboard", { user });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});
//signup route
router.get("/login", (req, res) => {
  res.render("login");
});

//route by id
router.get("/post/:id", withAuth, (req, res) => {
  Post.findByPk({
    where: {
      id: req.params.id,
    },
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "Couldn't find post with this id" });
        return;
      }
      const post = dbData.get({ plain: true });
      res.render("postsingle", { post });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//export module
module.exports = router;
