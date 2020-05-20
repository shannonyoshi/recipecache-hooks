const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./auth-model");

/* Endpoints: 
    TODO:
      GET  /status     checks for cookies to see if use is logged in
    X POST /register   adds new user to DB, encrypts password, adds redis cookie
      POST /log-in     creates redis user session
      POST /logout     deletes user session
    LATER:  
      PUT  /updatePw   updates and encrypts password
*/

router.get("/status", async (req, res) => {
  console.log(" STATUS req.session", req.session);
  if (req.session && req.session.userId) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

router.post("/register", async (req, res) => {
  // console.log("req", req);
  let user = req.body;
  // console.log("user", user);
  const pwHash = bcrypt.hashSync(user.password, 10);
  user.password = pwHash;
  try {
    const addedUserArray = await Users.add(user);
    if (addedUserArray) {
      const addedUser = addedUserArray[0];
      req.session.userId = addedUser.id;
      //req.session.save();
      console.log("addedUser", addedUser);
      // console.log("REGISTER req.session", req.session);
      res.status(201).json({ message: "User added" });
    } else {
      res.status(401);
    }
  } catch (e) {
    console.log("e auth router", e.errno);
    if (e.errno === 19) {
      res.status(400).json({ message: "Account already exists" });
    }
    res.status(500).json({ message: "Unable to register" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log("password", password);
  console.log("Log in email", email);
  try {
    const userArray = await Users.findBy({ email: email });
    const user = userArray[0];
    console.log("user", user);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      // req.session.save();
      console.log("LOGIN req.session", req.session);
      res.status(200).end();
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ message: "Server error occurred" });
  }
});

module.exports = router;
