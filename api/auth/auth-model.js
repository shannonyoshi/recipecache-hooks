const db = require("../data/dbConfig.js");


module.exports = {
  add,
  findBy,
  findById,
  removeId,
  // update,
};

async function add(user) {
  await db("users").insert(user);
  return findBy({ email: user.email });
}

async function findBy(filter) {
  return await db("users").where(filter);
}

async function findById(id) {
  return db("users").where({ id: id }).first();
}

async function removeId(id) {
  await db("users").where({ id: id }).del();
}
