const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./auth-model");

/* Endpoints: 
    TODO:
      POST /register   adds new user to DB, encrypts pw
      PUT  /updatePw   updates and encrypts pw
      POST /login      creates redis user session
      POST /logout     deletes user session
*/

router.post("/register", async (req, res) => {
  // console.log("req", req);
  let user = req.body;
  console.log("user", user);
  const pwHash = bcrypt.hashSync(user.password, 10);
  user.password = pwHash;
  try {
    const addedUser = await Users.add(user);
    if (addedUser) {
      res.status(201);
    } else {
      res.status(401);
    }
  } catch (e) {
    res.status(500).json({ message: "Unable to register" });
    console.log("e", e);
  }
});

router.post("/log-in", async (req, res) => {
  let { email, pw } = req.body;
  try {
    const user = await Users.findBy({ email: email });
    if (user[0] && bcrypt.compareSync(pw, user.password)) {
      res.status(200);
    } else {
      res.status(401).json({ message: "Unable to log in, please try again" });
    }
  } catch (e) {
    res.status(500).json({ message: "" });
    console.log("e", e);
  }
});

module.exports = router;
