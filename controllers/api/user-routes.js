//require routes
const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

//get routes
router.get("/", withAuth, (req, res) => {
  // console.log(req.session);
  User.findByPk(req.session.user_id, {
    include: [Post],
  })
    .then((dbData) => {
      // console.log(dbData);
      const user = dbData.get({ plain: true });
      console.log(user);
      res.render("postsingle", { user });
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json(err);
    });
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.username = dbUserData.username;
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res.status(400).json({
        message: "Incorrect user name or password. Please try again!",
      });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "Incorrect user name or password. Please try again!",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
