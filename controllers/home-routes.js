//require modules
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

//establish routes for homepage
router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbData) => {
      const userPosts = dbData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts: userPosts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//login/signup route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//route by id for post edit
router.get("/postsingle/:id", (req, res) => {
  console.log("test");
  Post.findByPk(req.params.id, {
    // where: {
    //   id: req.params.id,
    // },
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
      res.render("postsingle", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get routes for dashboard
router.get("/dashboard", withAuth, (req, res) => {
  // console.log(req.session);
  User.findByPk(req.session.user_id, {
    include: [Post],
  })
    .then((dbData) => {
      // console.log(dbData);
      const user = dbData.get({ plain: true });
      console.log(user);
      res.render("dashboard", { user: user, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});
//get routes for adding a post
router.get("/postadd", withAuth, (req, res) => {
  // console.log(req.session);
  User.findByPk(req.session.user_id, {
    include: [Post],
  })
    .then((dbData) => {
      // console.log(dbData);
      const user = dbData.get({ plain: true });
      // console.log(user);
      res.render("postadd", { user });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});

//route by id for post edit
router.get("/postedit/:id", withAuth, (req, res) => {
  console.log("test");
  Post.findByPk(req.params.id, {
    // where: {
    //   id: req.params.id,
    // },
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
      res.render("postedit", { post });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//export module
module.exports = router;
