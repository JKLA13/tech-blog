//require
const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create post
router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.contect,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export
module.exports = router;
