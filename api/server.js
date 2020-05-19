const express = require("express");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
const helmet = require("helmet");
const redisStore = require("connect-redis")(session);

const authRouter = require("./auth/auth-router");
const recipesRouter = require("./recipes/recipes-router");

const server = express();

server.use(helmet());
server.use(cors({ origin: "*" }));
server.use(express.json());

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.HOST,
});
redisClient.on("error", (err) => {
  console.log("Redis Error: ", err);
});

server.use(
  session({
    secret: process.env.SECRET,
    store: new redisStore({
      client: redisClient,
    }),
    resave: false,
    saveUninitialized: false,
    name: "RecipeCache",
    cookie: {
      secure: false, //TODO: CHANGE THIS SETTING FOR PRODUCTION
      httpOnly: true, //prevents client side JS from reading cookie
      maxAge: 1000 * 60 * 24 * 7, //in milliseconds
    },
  })
);

server.use("/api/auth", authRouter);

server.use("/api/recipes", recipesRouter);

server.get("/", (req, res) => {
  res.send("Server running...");
});

module.exports = server;
