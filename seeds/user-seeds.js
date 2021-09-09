const { User } = require("../models");

const userData = [
  {
    email: "jerry@email.com",
    password: "password1",
  },
  {
    email: "Mary@email.com",
    password: "password2",
  },
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;
