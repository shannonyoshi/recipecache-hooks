require("dotenv").config()


// color testing comment
const server = require('./server');

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT}\n`);
});
