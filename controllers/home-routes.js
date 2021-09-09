//require modules
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

//establish routes
router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbData) => {
      const userPosts = dbData.map((post) => post.get({ plain: true }));
      res.render("homepage", { userPosts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//signup route
router.get("/login", (req, res) => {
  res.render("login");
});

//route by id
router.get("/post/:id", (req, res) => {
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
      res.render("single-post", { post });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//export module
module.exports = router;
