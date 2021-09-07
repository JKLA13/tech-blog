const userSeed = require("./user-seeds");
const commentSeed = require("./commentData");
const postSeed = require("./post-seeds");

const sequelize = require("../config/connection");

const allSeed = async () => {
  await sequelize.sync({ force: true });
  await postSeed();
  await userSeed();
  await commentSeed();
  process.exit(0);
};

allSeed();
