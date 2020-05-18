const db = require("../data/dbConfig.js");

module.exports = {
  add,
  filterFind,
  findById,
  remove,
  update
};

async function add(user) {
  await db("users").insert(user);
  return filterFind({ email: user.email });
}

async function filterFind(filter) {
  return await db("users").where(filter);
}

async function findById(id) {
  return db("users").where({ id }).first();
}
