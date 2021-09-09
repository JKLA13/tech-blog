const { User } = require("../models");

const userData = [
  {
    username: "Jerry1",
    password: "password1",
  },
  {
    username: "Mary2",
    password: "password2",
  },
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;
