const { Post } = require("../models");

const dataPost = [
  {
    title: "JavaScript",
    content: "A programming language for web pages and back end servers.",
    user_id: 1,
  },
  {
    title: "Node.js",
    content: "a JavaScript runtime built on Chrome's V8 JavaScript engine",
    user_id: 2,
  },
];

const postSeed = () => Post.bulkCreate(dataPost);

module.exports = postSeed;
