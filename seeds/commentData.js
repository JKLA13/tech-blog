const { Comment } = require("../models");

const commentsData = [
  {
    comment_text: "Great post!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Lots of good info!",
    user_id: 2,
    post_id: 2,
  },
];

const commentSeed = () => Comment.bulkCreate(commentsData);

module.exports = commentSeed;
