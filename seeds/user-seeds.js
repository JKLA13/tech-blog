const { User } = require("../models");

const userData = [
  {
    username: "Jerry",
    password: "password1",
  },
  {
    username: "Mary",
    password: "password2",
  },
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;
