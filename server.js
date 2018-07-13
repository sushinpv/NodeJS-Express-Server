const http = require("http");
const app = require("./app");
const config = require("./config/config.json");
//TODO: Make use of forever npm library and cluster based programming for fast and reliable application
const PORT = config._PORT || 3010;

const server = http.createServer(app);

//console.log("server started")
server.listen(PORT);