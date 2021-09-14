const { Post } = require("../models");

const dataPost = [
  {
    title: "Tech Blog 1",
    content: "1001110001101010001110001111",
    // user_id: 1,
  },
  {
    title: "Tech Blog 2",
    content: "1011001100011100011001",
    // user_id: 2,
  },
];

const postSeed = () => Post.bulkCreate(dataPost);

module.exports = postSeed;
