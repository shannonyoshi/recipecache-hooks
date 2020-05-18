const router = require("express").Router();
const bcrypt = require("bcryptjs");

/* Endpoints: 
    TODO:
      POST /register   adds new user to DB, encrypts pw
      PUT  /updatePw   updates and encrypts pw
      POST /login      creates redis user session
      POST /logout     deletes user session
*/
