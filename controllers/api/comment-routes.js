//create comment
//require
const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create comment
router.post("/", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export
module.exports = router;
