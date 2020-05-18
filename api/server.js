const express = require("express");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
const helmet = require("helmet");
const redisStore = require("connect-redis")(session);

// const authRouter = require('./api/auth/auth-router.js');
const recipesRouter = require("./recipes/recipes-router");

const server = express();

server.use(helmet());
server.use(cors({ origin: "*" }));
server.use(express.json());

// const redisClient = redis.createClient();
// redisClient.on("error", (err) => {
//   console.log("Redis Error: ", err);
// });

// server.use(
//   session({
//     secret: process.env.SECRET,
//     store: new redisStore({
//       client: redisClient,
//       host: process.env.HOST,
//       port: process.env.REDIS_PORT,
//     }),
//     resave: false,
//     saveUninitialized: false,
//     name: "RecipeCache",
//   })
// );

// server.use('/api/auth', authRouter);

server.use("/api/recipes", recipesRouter);

server.get("/", (req, res) => {
  res.send("Server running...");
});

module.exports = server;
